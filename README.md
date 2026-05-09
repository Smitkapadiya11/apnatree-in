# ApnaTree

Next.js marketing site and customer dashboard for managed mango tree allotments.

## Run locally

- Copy `.env.example` to `.env.local` and fill real values (Postgres, OAuth, Stripe, UploadThing, Resend).
- Install dependencies and generate the Prisma client: `npm install` then `npx prisma generate`.
- Apply migrations if needed: `npx prisma migrate deploy` (or `migrate dev` in development).
- Start the app: `npm run dev` and open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

- Connect the Git repository and set the same environment variables as in `.env.example` in the Vercel project settings (Production + Preview as appropriate).
- Use a managed Postgres instance and set `DATABASE_URL`; run `npx prisma migrate deploy` against production from CI or locally when releasing.
- Configure Stripe webhook URL to your production `/api/webhooks/stripe` endpoint and set `STRIPE_WEBHOOK_SECRET` from the Stripe CLI or dashboard.

## Adding farm media

Static marketing imagery and hero video are read from **`public/media/farm`** (see `src/lib/farm-media.ts`). Files whose names or folder names match keywords (for example `hero`, `orchard`, `harvest`) are grouped automatically; entries starting with `_` or `.` are ignored.

### Windows: copy from a source folder

If your originals live outside the repo, copy them into the project (PowerShell or Command Prompt):

```bat
xcopy /E /I /Y "E:\projects\farm" "public\media\farm"
```

Use the path **`E:\projects\farm`** as your optional staging folder on disk, or any folder you prefer—adjust the first path in the command accordingly. After a successful copy, you can delete `public/media/farm/COPY_SKIPPED.txt` if it is present.

### Suggested layout under `public/media/farm`

Organize files into subfolders so filenames stay readable and keyword routing works well:

- **`hero/`** — wide cover stills or cinematic clips (`hero`, `banner`, `drone`, `aerial` in the filename help selection).
- **`trees/`** — orchard rows, canopy, grove (`tree`, `orchard`, `field` in path or name).
- **`harvest/`** — fruit, picking, crates (`harvest`, `mango`, `fruit`).
- **`visitors/`** — tours and guests (`visit`, `guest`, `family`).
- **`team/`** — staff and field agents (`team`, `farmer`, `staff`).

Supported image types: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`. Video: `.mp4`, `.mov`, `.webm`, `.m4v`. When no media is present, the site uses SVG placeholders under `public/media/farm/_placeholder-*.svg` so layouts do not collapse.

## Environment variables

See **`.env.example`** for required keys: `DATABASE_URL`, NextAuth (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`), Google OAuth, Stripe, UploadThing, Resend (`RESEND_API_KEY`, `FROM_EMAIL`), and public URLs / Stripe publishable key.

Optional:

- **`NEXT_PUBLIC_WHATSAPP_E164`** — E.164 number shown on the contact page for WhatsApp links.

## Learn More

This project uses [Next.js](https://nextjs.org/docs). For framework-specific topics, see the [Next.js documentation](https://nextjs.org/docs).
