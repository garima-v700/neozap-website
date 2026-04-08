import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ProductClient from '@/components/product/ProductClient'
import ReviewsCarousel from '@/components/product/ReviewsCarousel'
import { fetchCatalog, ASSETS } from '@/lib/data'
import type { Card } from '@/types'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catalog = await fetchCatalog()
  const card = catalog?.cards.find(c => c.id === Number(params.id))
  if (!card) return { title: 'Card Not Found – NeoZAP' }
  return {
    title: `${card.name} – NeoZAP Metal Cards`,
    description: card.desc ?? `Premium ${card.name} metal credit card by NeoZAP.`,
  }
}

export const dynamic = 'force-dynamic' // always fetch fresh data

export default async function ProductPage({ params }: Props) {
  const catalog = await fetchCatalog()
  const cards: Card[] = catalog?.cards ?? []
  const card = cards.find(c => c.id === Number(params.id))
  if (!card) notFound()

  const bestsellers = cards
    .filter(c => c.bestseller)
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    .slice(0, 4)

  return (
    <>
      <Navbar buyHref="/collection" />
      <main style={{ background: '#040404', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{ padding: '20px 60px 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 6px', color: 'rgba(255,255,255,0.3)' }}>/</span>
          <Link href="/collection" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Collection</Link>
          <span style={{ margin: '0 6px', color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span>{card!.name}</span>
        </div>

        <div style={{ paddingTop: 28 }}>
          <ProductClient card={card!} />
        </div>

        <ReviewsCarousel cardReviews={card!.reviews} />

        {/* Bestsellers */}
        {bestsellers.length > 0 && (
          <section style={{ padding: '54px 79px 60px' }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>Our Bestseller Collection</h2>
            <div style={{ width: 66, height: 3, background: 'linear-gradient(90deg,#4f7fe8,#a5b4fc)', marginBottom: 36, borderRadius: 2 }} />
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {bestsellers.map(bs => (
                <Link key={bs.id} href={`/product/${bs.id}`}
                  style={{ width: 294, border: '1px solid rgba(255,255,255,0.33)', borderRadius: 10, padding: '10px 10px 18px', textDecoration: 'none', color: 'white', display: 'block' }}>
                  <div style={{ width: 273, height: 170, background: 'linear-gradient(135deg,#1a1a2e,#16213e)', borderRadius: 8, marginBottom: 12, overflow: 'hidden' }}>
                    {(bs.imgCol || ASSETS.bestsellerCard) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={bs.imgCol ?? ASSETS.bestsellerCard} alt={bs.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{bs.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Premium metal credit card</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>₹{(bs.dprice ?? bs.price).toLocaleString('en-IN')}</span>
                    {bs.dprice && (
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>₹{bs.price.toLocaleString('en-IN')}</span>
                        <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.45)', transform: 'rotate(-8deg)', display: 'block' }} />
                      </span>
                    )}
                  </div>
                  <button className="btn-blue-gradient" style={{ width: '100%', height: 28, borderRadius: 4, fontSize: 13, fontWeight: 500 }}>
                    Buy Now
                  </button>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
