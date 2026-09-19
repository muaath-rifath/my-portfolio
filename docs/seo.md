# Search and freelance inquiries

The site targets four service intents: MVP development, website development, ecommerce development, and custom software/integrations. `/services` links to a dedicated page for each. The homepage introduces the offer, `/experience` supplies evidence, and `/contact` collects inquiries.

## After deployment

1. Add or verify `https://www.muaathrifath.me` in Google Search Console. Existing Bing, Yandex, and Seznam verification tags are preserved. Google domain verification can be done through DNS; no invented verification token is included.
2. Submit `https://www.muaathrifath.me/sitemap.xml`. Inspect the homepage, services index, and four service URLs with URL Inspection to confirm the production canonical and indexing status.
3. Check production structured data with Google's Rich Results Test and Schema.org's validator. Person and Service markup describe the content; they do not guarantee a special search result.
4. Confirm the production contact form delivers an inquiry. This flow depends on the existing email/CAPTCHA configuration and was not changed as part of SEO work.
5. Track service-page impressions, clicks, search terms, and qualified inquiries monthly. Establish a baseline before judging changes. Rankings and leads are not guaranteed by metadata or structured data.

## Content that can attract clients

- Publish a case study for a real project: the customer's problem, scope, implementation, screenshots with permission, and verifiable outcomes. Link it to the relevant service.
- Answer questions buyers actually ask: what belongs in an MVP, what determines a website's cost, when a custom store makes sense, and how to plan an integration. Use real examples and avoid invented rates, deadlines, or testimonials.
- Keep GitHub, LinkedIn, and professional profiles consistent and link them to the relevant service page when useful.
- Expand pages when you have genuinely different expertise or evidence. Do not create duplicate city pages or mass-produced keyword variants.

## Maintaining the implementation

- `lib/seo.ts` owns the production origin and page metadata helper.
- `lib/services.ts` owns service slugs and copy; the index, detail pages, home links, and sitemap consume it.
- Existing pages have their own title, description, canonical, and social URL. Article schema describes the actual article; service schema matches visible service content.
- The sitemap deliberately omits `lastModified`: build time is not a content update date. Add dates only when actual revisions are tracked.
- To verify a route, inspect the server HTML as well as the browser: one descriptive title, self-canonical, matching `og:url`, correct description, indexable main content, and working internal links.

References: [Google's developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers), [title links](https://developers.google.com/search/docs/appearance/title-link), and [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
