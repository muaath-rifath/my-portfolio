# Personal Portfolio

This is a personal portfolio project built with [Next.js](https://nextjs.org/), incorporating SchadCn Components and Accernity UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- SchadCn Components
- Accernity UI
- MongoDB
- Mongoose

## Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL="Portfolio <hello@your-verified-domain.com>"
CONTACT_TO_EMAIL=contact@muaathrifath.me
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
```

`RESEND_FROM_EMAIL` must use a domain verified in Resend. `CONTACT_TO_EMAIL` is optional and defaults to `contact@muaathrifath.me`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
