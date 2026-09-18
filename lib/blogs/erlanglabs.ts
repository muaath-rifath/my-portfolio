export const erlanglabsPost = {
  slug: "building-erlanglabs-on-open-source",
  title: "Building ErlangLabs on Infrastructure I Can Own",
  description: "Nine infrastructure choices, one goal: keep control of the platform. From APISIX at the front door to LiveKit workers that need no public route.",
  author: "Mohamed Muaath Rifath",
  content: `Imagine moving a voice AI platform to a different cloud. The application containers start successfully. Then you discover that login depends on the old provider’s identity service, background jobs live in its queue, and every worker expects its private network.

The code moved. The platform did not.

That was the kind of dependency I wanted to avoid when building ErlangLabs, a platform where organizations create voice agents, attach knowledge, and run calling workflows.

My question for each infrastructure choice was simple: can I run this myself, understand how it works, and move it without rebuilding the product around it?

That question led to nine components: Apache APISIX, ZITADEL, OpenBao, OpenZiti, PostgreSQL, Redis, NATS JetStream, Qdrant, and LiveKit. Each solves a different problem, but together they give the platform something I care about: control over where it runs and how its parts connect.

## Apache APISIX: the front door belongs to the application

A request should reach the same API whether its backend runs on today’s server or a machine I provision tomorrow. The gateway is where that promise starts.

I use Apache APISIX to route ErlangLabs’ public traffic, validate JWTs through its OpenID Connect integration with ZITADEL, and apply rate limits. The routes and policies are configuration I control, alongside the services they protect.

APISIX also starts the trace for every public request. Its request-ID plugin generates a request ID and adds it to the forwarded request headers. Core includes that same ID in its structured logs and carries it into the work it publishes to NATS JetStream. The Dialer Engine then receives the ID with the job, passes it into its LiveKit dispatch context, and the LiveKit worker writes it with its own logs.

That creates one searchable path through an asynchronous call flow:

- APISIX Gateway generates the request ID and forwards it to Core.
- Core records it and attaches it to the JetStream job.
- The Dialer Engine logs and forwards it with the LiveKit dispatch.
- The LiveKit worker uses the same ID when handling the call.

If a dispatch fails, I can start from the request ID at the gateway and follow that single operation across Core, the JetStream handoff, the Dialer, and the worker. This matters because a call can fail long after the original HTTP response has returned; the ID links the logs even when the work changes services and transport.

Consider moving the knowledge service to another host. The public API can keep its address while I change the upstream destination. Clients do not need to learn where that service now lives, and the authentication policy can remain in place.

APISIX also removes untrusted identity and internal-authorization headers before forwarding requests. A client cannot become an administrator by adding a convincing-looking header. Backend services still verify the caller and enforce organization access themselves.

ZITADEL’s console and administrative paths are blocked at the public APISIX gateway. Administrative access goes through OpenZiti, which also protects SSH and internal infrastructure such as databases.

This gives the gateway a defined responsibility: control the public entry point and apply shared traffic rules. It does not become the sole authority for every business decision behind that entry point.

The gateway itself is [Apache 2.0 licensed](https://github.com/apache/apisix/blob/master/LICENSE). I can operate that boundary on infrastructure I choose. But a portable front door is only useful if the identity behind it can move too.

## ZITADEL: a workspace name is not proof of ownership

For ErlangLabs, authentication has to answer more than “is this person signed in?” It also needs to establish which organization they belong to and which workspace they may access.

I use self-hosted ZITADEL for identity, organization management, and SSO support. The dashboard integrates through OpenID Connect and Auth.js, keeping access tokens in its server-side session while deriving workspace context from the organization subdomain.

There is a useful distinction between claiming a company name and proving control of its domain. Anyone can type a name into a registration form. ErlangLabs’ domain-claim workflow asks the claimant to publish a DNS TXT record, providing evidence that they control the domain.

That verification has a specific purpose. It does not automatically grant access to every record associated with the organization. Core separately resolves active membership, and PostgreSQL row-level security enforces tenant boundaries during data access.

These layers let identity remain stable even when application services move. The issuer, organization relationships, and authorization rules are not defined by whichever provider happens to host the dashboard.

ZITADEL’s main server uses [AGPL-3.0](https://github.com/zitadel/zitadel/blob/main/LICENSING.md). That provides an open-source identity foundation, with license obligations that belong in the deployment decision.

Human identity is one side of the system. The services themselves also need credentials, and those credentials need a home.

## OpenBao: the credentials should not travel inside the image

A container image is easy to copy. A container image carrying database passwords and provider keys is easy to copy for all the wrong reasons.

I use OpenBao for storing secrets so sensitive configuration has a place separate from the application artifact. The service image describes what to run; secret management handles sensitive values needed in its environment.

This separation matters when deploying the same application into different environments. It also matters when changing a credential: I want that to be a controlled operational change, rather than a reason to build credentials into another image.

OpenBao manages secrets, certificates, and keys under open governance. Its [MPL 2.0 license](https://github.com/openbao/openbao/blob/main/LICENSE) and [project direction](https://openbao.org/) fit the same requirement as the gateway and identity service: this is infrastructure I can operate.

For Docker Swarm deployments, Swarm Secrets provide the bootstrap credential: each service receives only its own narrowly scoped AppRole Secret ID. A Bao agent running alongside each workload combines that value with its Role ID to authenticate to OpenBao. OpenBao returns a short-lived token whose policy names exactly which paths the workload may read.

The agent pattern keeps OpenBao tokens out of application code. The agent authenticates, renews the token while the workload is alive, and renders approved values into files. Each service reads only its approved files for static runtime configuration. Revoking an AppRole or changing its policy takes effect at the identity boundary, rather than requiring credentials baked into every image.

Static KV v2 secrets are appropriate for values such as a LiveKit API key and secret. Database access is a stronger use case for OpenBao’s dynamic secrets: it can mint a separate, short-lived database credential for each workload instance, making access individually auditable and automatically expiring.

This is where secrets and networking meet. A service may have a valid OpenBao-issued credential, but I still need to decide whether it can reach the destination at all.

## OpenZiti: SSH and internal services require authorized private access

OpenZiti is a security boundary in ErlangLabs. Without connecting through OpenZiti with an authorized identity, I cannot reach SSH, the ZITADEL console, databases, or the other protected internal services. Knowing a server’s address or possessing an application password does not provide a public route to those endpoints.

APISIX exposes the public application routes and blocks ZITADEL’s administrative paths. OpenZiti provides the separate, private path for administration. Public login remains available to users, while access to the identity system’s console requires both OpenZiti authorization and ZITADEL’s own permissions.

The controller manages identities and access policies. Dial policies determine which identities may connect to a service; Bind policies determine which identities may host it. Edge-router policies govern which routers identities and services may use. Connecting to OpenZiti therefore does not grant access to every internal destination. [OpenZiti access policies](https://netfoundry.io/docs/openziti/learn/core-concepts/security/authorization/policies/overview/).

Edge routers carry the authorized traffic across the OpenZiti network. A client’s tunneler sends a protected connection into the overlay, and the hosting side forwards it to the internal service. The controller handles the control plane; application traffic travels through the routers. These connections let private services remain reachable through the overlay without exposing their own ports to the public internet. [OpenZiti connection security](https://openziti.io/docs/learn/core-concepts/security/connection-security), [service topologies](https://openziti.io/docs/guides/topologies/services/).

For SSH, that means establishing an authorized OpenZiti connection before SSH authentication can even begin. Database credentials and ZITADEL administrator permissions work the same way: they are required at the destination, after the network has permitted access. Application authorization and mTLS remain additional protections within that boundary.

Because [OpenZiti is Apache 2.0 licensed](https://github.com/openziti/ziti/blob/main/LICENSE), I can operate this security boundary on infrastructure I control. When a service moves, its private destination can change while access remains tied to the identities permitted to use it.

With the paths between services established, the next question is what must remain intact when one of those services disappears.

## PostgreSQL: where the system remembers what happened

Suppose two calls try to reserve the last available credit in an organization’s account at the same time.

Both requests might read the same balance. Without coordination, both could conclude that there is enough money. This is the kind of decision I want inside a database transaction, with the relevant rows locked while the balance changes.

PostgreSQL is the durable foundation of ErlangLabs. Organizations, workflows, call records, provisioning progress, and the billing ledger live in databases whose schemas and migrations I control.

For billing, that means integer micro-INR balances, idempotent operations, and locked credit holds. For organization provisioning, it means a persisted workflow that can tell a recovering worker which targets succeeded and which still need attention.

PostgreSQL also participates in tenant isolation. Services establish organization context within a transaction, and row-level security constrains access to tenant-owned data.

The benefit is concrete: the application process can restart without becoming the only witness to a financial or workflow decision.

PostgreSQL’s [open-source license](https://www.postgresql.org/about/licence/) gives me freedom over its hosting. Moving a database still means planning replication or restoration, connectivity, and cutover. The advantage is that the schema and database interface remain familiar on the other side.

Not every shared value needs to live in that durable model, though. Some state exists to coordinate fast decisions at the edge.

## Redis: three gateways should not mean three allowances

Imagine a request limit of 100 requests per minute stored independently in each gateway process. Add three gateway instances, and a client that reaches all three may effectively receive three separate allowances.

Redis gives those gateway instances a shared place to keep the counters. APISIX uses Redis both as shared rate-limit state and alongside the request-ID boundary above: one protects the gateway from uneven traffic, while the other makes the resulting work observable after it moves deeper into the platform.

In ErlangLabs, APISIX uses Redis-backed rate limiting. The [limit-count plugin’s Redis policy](https://apisix.apache.org/docs/apisix/plugins/limit-count/) makes the counter external to an individual gateway process, so scaling the gateway does not require each instance to invent its own view of the allowance.

That is the kind of fast shared state Redis handles in this architecture. The billing ledger stays in PostgreSQL. A request counter and a financial balance have different persistence and coordination requirements.

Redis also illustrates why “open source” needs to be checked against a version. Redis 7.2 and earlier use BSD-3-Clause. Redis 7.4 moved to the source-available RSALv2/SSPLv1 licenses. Redis 8 adds AGPLv3 as an open-source option. The deployment version and selected license determine the claim I can make. [Redis licensing](https://redis.io/legal/licenses/).

Shared counters solve one coordination problem. Getting unfinished work from one service to another requires a different mechanism.

## NATS JetStream: work should survive the worker

A user creates an organization. Core saves it successfully. Before downstream provisioning starts, the process stops.

If the only record of the next step was an in-memory function call, the organization would exist while its setup request had vanished.

ErlangLabs uses a transactional outbox for this handoff. Core records the provisioning event in the same PostgreSQL transaction as the associated state change. That durable intent can then be published through NATS JetStream.

A separate Provisioner consumes the request, persists its workflow, and coordinates setup across downstream services. Successful targets remain complete while failed ones can be retried independently.

JetStream also carries document-ingestion and outbound dialer work. Workers acknowledge messages explicitly, and the application handles repeated delivery through idempotent claims and operations. Receiving a message twice should not mean blindly creating the same resource twice.

Tenant context travels with the work. In the ingestion and dialer paths, the organization in the message payload must match the organization encoded in the subject before the worker changes state.

This lets worker processes come and go while the queue and workflow records preserve the handoff. [NATS Server, including JetStream, is Apache 2.0 licensed](https://github.com/nats-io/nats-server/blob/main/LICENSE), so that coordination does not depend on a cloud-specific queue API.

One of those queued jobs turns an uploaded document into knowledge a voice agent can use. That leads to the next boundary: retrieval.

## Qdrant: a relevant answer still has to be an authorized answer

A vector search can return a semantically excellent match that belongs to the wrong organization. Relevance alone is not enough in a multi-tenant product.

I use Qdrant for the knowledge retrieval layer. Document workers extract content, create embeddings, and index vectors with organization, knowledge-base, and document identifiers.

At query time, Integrations filters by both organization and knowledge base. It also checks the returned payloads before passing text back to the caller. Core provides a signed call token that limits which knowledge bases the voice worker may request.

That keeps the retrieval boundary explicit. The worker does not get to choose an arbitrary organization and search its documents.

Qdrant also separates the place I store and search vectors from the service that creates embeddings. Its [Apache 2.0 license](https://github.com/qdrant/qdrant/blob/master/LICENSE) gives me a self-hostable search engine whose data and deployment I control.

Changing embedding models can still require re-embedding documents and rebuilding an index. Portability does not make different vector spaces compatible. It gives me control over the migration instead of making the entire knowledge layer inseparable from an inference provider.

Now the platform can preserve work and retrieve authorized knowledge. The final piece is where the voice agent itself runs.

## LiveKit: add a worker without adding a public route

This is one of my favorite properties of the stack: another voice worker does not need another public endpoint.

An agent worker connects to LiveKit using the server URL, API key, and API secret. It registers over an outbound WebSocket connection, and LiveKit balances job dispatch across available agent servers. The worker does not need a public hostname or inbound application route to receive jobs. [LiveKit self-hosted agent deployment](https://docs.livekit.io/deploy/custom/deployments/).

The practical difference is easy to picture. I can start another appropriately configured worker without teaching Core its IP address or adding that worker to APISIX. Core requests the work; LiveKit handles the registered worker pool.

In ErlangLabs, Core owns call configuration and admission, the Dialer requests dispatch, and the selected worker receives the context for the call. Worker placement stays outside the business workflow.

API credentials establish the connection. Compute still has to be provisioned and scaled, workers need access to their dependencies, and a self-hosted LiveKit server needs its media-network configuration. What LiveKit removes is the need to build per-worker public routing and a separate worker-address registry into the application.

The [LiveKit server’s Apache 2.0 license](https://github.com/livekit/livekit/blob/master/LICENSE) preserves a self-hosting path for that realtime layer.

This is where the earlier choices come together. A worker needs secrets, permitted connectivity, access to scoped knowledge, and a way to receive work. Those requirements can be satisfied without making its location part of ErlangLabs’ product logic.

## What owning this stack actually gives me

The strongest test of this architecture is a change: move a service, replace a worker, restore a database, or add capacity. How much of the rest of the platform has to learn about it?

APISIX can keep the public interface stable. ZITADEL can preserve the identity model. OpenBao and OpenZiti can support secrets and private access. PostgreSQL, Redis, NATS JetStream, and Qdrant give different kinds of state a defined home. LiveKit lets voice workers register wherever I can provide the required connectivity and resources.

Open-source components can coexist with paid hosting and proprietary management products. I care about the license and capabilities of the actual software I run; a vendor’s entire catalog is a different question.

The product also uses external services, including Plivo, Vertex AI, and GCS. Those integrations have their own migration costs. An open-source infrastructure foundation gives me clearer boundaries around those dependencies, rather than making the whole product vendor-free by definition.

Self-hosting means owning the operational work too: upgrades, backups, monitoring, and recovery.

What I get in return is the ability to make those decisions. The platform can grow across infrastructure I choose, and changing providers can remain a migration project instead of becoming a rewrite of ErlangLabs.`,
};

export const readingMinutes = Math.ceil(erlanglabsPost.content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).length / 220);

export function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
