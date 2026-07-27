# Moviecam Frontend

Next.js storefront for [moviecam.ma](https://moviecam.ma).

## Stack

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS, shadcn/ui
- next-intl (AR / FR / EN)
- Zustand (cart), TanStack Query

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment

Copy and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_STORE_LAT=30.3609346
NEXT_PUBLIC_STORE_LNG=-9.5365017
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
```

## Docker

```bash
docker build -t moviecam-web .
docker run -p 3000:3000 moviecam-web
```

## Production

- **Domain:** moviecam.ma
- **API:** api.moviecam.ma

Build args for Docker:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.moviecam.ma \
  --build-arg NEXT_PUBLIC_SITE_URL=https://moviecam.ma \
  -t moviecam-web .
```
