# NeoZAP – Next.js Website

India's First Prepaid Metal Card website, built with Next.js 14 (App Router), TypeScript, and React 18.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              ← Home page (landing)
│   ├── collection/page.tsx   ← Collection page
│   ├── product/[id]/page.tsx ← Product detail page
│   ├── layout.tsx            ← Root layout + metadata
│   ├── globals.css           ← Global styles
│   └── not-found.tsx         ← 404 page
├── components/
│   ├── shared/               ← Navbar, Footer, StickyCTA
│   ├── home/                 ← Hero, Bestseller, Security, Convert, Rewards, FAQ, HomeFooter
│   ├── collection/           ← CollectionClient (category filter + grid)
│   └── product/              ← ProductClient, ProductGallery, ReviewsCarousel
├── lib/
│   └── data.ts               ← Asset URLs, categories, placeholder cards, FAQ
└── types/
    └── index.ts              ← Card, Category, Review, CardColor types
public/
├── videos/
│   └── hero-card.mp4         ← Hero video
└── images/                   ← (Place your downloaded images here — see below)
```

## ⚠️ Before Deploying — Replace Figma Asset URLs

The Figma asset URLs in `src/lib/data.ts` **expire after 7 days**. Before pushing to production:

1. Open `src/lib/data.ts`
2. For each URL in the `ASSETS` object, open the URL in your browser and save the image
3. Place saved images in `/public/images/`
4. Update the URL in `ASSETS` from `https://www.figma.com/api/mcp/asset/...` to `/images/your-filename.png`

### Image reference table

| Key in ASSETS     | Description                  | Filename suggestion        |
|-------------------|------------------------------|----------------------------|
| catExclusive      | Exclusive category icon      | cat-exclusive.png          |
| catCards          | Cards category icon          | cat-cards.png              |
| catAnimals        | Animals category icon        | cat-animals.png            |
| catAnime          | Anime category icon          | cat-anime.png              |
| catRoyal          | Royal category icon          | cat-royal.png              |
| catSignature      | Signature category icon      | cat-signature.png          |
| catAbstract       | Abstract category icon       | cat-abstract.png           |
| catGames          | Games category icon          | cat-games.png              |
| visaLogo          | Visa logo (hero)             | visa-logo.png              |
| benefitMovie1/2   | Movie ticket benefit icons   | benefit-movie1/2.png       |
| benefitFood1/2    | Food benefit icons           | benefit-food1/2.png        |
| benefitTravel1/2  | Travel benefit icons         | benefit-travel1/2.png      |
| bestsellerCard    | Bestseller placeholder card  | bestseller-card.png        |
| secDivider        | Security section divider     | sec-divider.png            |
| securityImg       | Security features image      | security-img.png           |
| convertGlow       | Convert section glow         | convert-glow.png           |
| convertCard       | Convert section card image   | convert-card.png           |
| convertDivider    | Convert section divider      | convert-divider.png        |
| movieTicket       | Movie ticket icon            | movie-ticket.png           |
| rewardsBg         | Rewards background image     | rewards-bg.png             |
| clockIcon         | Timer clock icon             | clock-icon.png             |
| ctaBall           | Sticky CTA ball image        | cta-ball.png               |
| payVisa/Mastercard/etc | Payment logos           | pay-visa.png, etc          |

## Connecting to the Admin Panel

The admin panel (`admin.html`) exports a JSON file. To use that data in Next.js:

1. Export JSON from the admin panel
2. Save it to `src/lib/cards-data.json`
3. In `src/lib/data.ts`, replace `PLACEHOLDER_CARDS` with:
   ```ts
   import cardsData from './cards-data.json'
   export const PLACEHOLDER_CARDS: Card[] = cardsData.cards
   ```

## Deployment

```bash
npm run build
npm start
```

Or push to GitHub and deploy to Vercel — it auto-detects Next.js.

## Tech Stack

- **Next.js 14** — App Router, SSG (`generateStaticParams`)
- **TypeScript** — Full type safety across all components
- **React 18** — Client components for interactive elements
- **No CSS frameworks** — Pure CSS-in-JS inline styles matching the Figma design exactly
