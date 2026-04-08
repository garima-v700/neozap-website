import type { Category, Card } from '@/types'

// ─── STATIC ASSETS ───────────────────────────────────────────────────────────
export const ASSETS = {
  catExclusive:  '/images/categories/catExclusive.png',
  catCards:      '/images/categories/catCards.png',
  catAnimals:    '/images/categories/catAnimals.png',
  catAnime:      '/images/categories/catAnime.png',
  catRoyal:      '/images/categories/catRoyal.png',
  catSignature:  '/images/categories/catSignature.png',
  catAbstract:   '/images/categories/catAbstract.png',
  catGames:      '/images/categories/catGames.png',
  visaLogo:      '/images/home/visaLogo.png',
  benefitMovie1: '/images/home/benefitMovie1.png',
  benefitMovie2: '/images/home/benefitMovie2.png',
  benefitFood1:  '/images/home/benefitFood1.png',
  benefitFood2:  '/images/home/benefitFood2.png',
  benefitTravel1:'/images/home/benefitTravel1.png',
  benefitTravel2:'/images/home/benefitTravel2.png',
  bestsellerCard:'/images/home/bestsellerCard.png',
  secDivider:    '/images/home/secDivider.png',
  securityImg:   '/images/home/securityImg.png',
  convertGlow:   '/images/home/convertGlow.png',
  convertCard:   '/images/home/convertCard.png',
  convertDivider:'/images/home/convertDivider.png',
  movieTicket:   '/images/home/movieTicket.png',
  rewardsBg:     '/images/home/rewardsBg.png',
  clockIcon:     '/images/home/clockIcon.png',
  ctaBall:       '/images/home/ctaBall.png',
  payVisa:       '/images/payment/payVisa.png',
  payMastercard: '/images/payment/payMastercard.png',
  payPhonePe:    '/images/payment/payPhonePe.png',
  payRazorpay:   '/images/payment/payRazorpay.png',
  payGPay:       '/images/payment/payGPay.png',
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'exclusive', label: 'Exclusive',  icon: ASSETS.catExclusive  },
  { id: 'cards',     label: 'Cards',      icon: ASSETS.catCards      },
  { id: 'animals',   label: 'Animals',    icon: ASSETS.catAnimals    },
  { id: 'anime',     label: 'Anime',      icon: ASSETS.catAnime      },
  { id: 'royal',     label: 'Royal',      icon: ASSETS.catRoyal      },
  { id: 'signature', label: 'Signature',  icon: ASSETS.catSignature  },
  { id: 'abstract',  label: 'Abstract',   icon: ASSETS.catAbstract   },
  { id: 'games',     label: 'Games',      icon: ASSETS.catGames      },
]

export const CAT_GRADIENTS: Record<string, { c1: string; c2: string }> = {
  exclusive: { c1: '#b88f1a', c2: '#3d2a06' },
  cards:     { c1: '#0f2a5a', c2: '#060e1e' },
  animals:   { c1: '#1a2f14', c2: '#060e04' },
  anime:     { c1: '#1c1c3a', c2: '#070712' },
  royal:     { c1: '#3a1414', c2: '#120404' },
  signature: { c1: '#2e2e2e', c2: '#0c0c0c' },
  abstract:  { c1: '#1a1030', c2: '#080410' },
  games:     { c1: '#a05030', c2: '#3a1a0a' },
  laser:     { c1: '#1a1a2e', c2: '#16213e' },
  color:     { c1: '#2a1a0e', c2: '#3e2516' },
}

export interface CatalogData {
  cards: Card[]
  categories: Category[]
  nextId: number
  nextCatId: number
}

export async function fetchCatalog(): Promise<CatalogData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/catalog`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export const FAQ_ITEMS = [
  { q: 'Is the DIY process difficult to do?',         a: 'Not at all! We designed our DIY Kit to be simple and safe. Most customers swap their chip in under 5 minutes.' },
  { q: 'Will my card still work after the transfer?', a: 'Yes! Same chip, same PIN, same contactless payments. Nothing changes except the feel.' },
  { q: 'How long does delivery take?',                a: 'Typically 5–7 business days. Express delivery is available at checkout.' },
  { q: 'What cards are supported?',                   a: 'Most Visa, Mastercard, and RuPay credit and debit cards.' },
  { q: 'Is my banking information safe?',             a: 'Absolutely. We never store your card number or banking data.' },
  { q: 'Can I get a custom design?',                  a: 'Yes! We offer laser engraving for custom names, numbers, and logos.' },
]
