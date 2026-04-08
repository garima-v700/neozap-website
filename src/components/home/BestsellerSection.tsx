import Link from 'next/link'
import { ASSETS, BESTSELLER_CARDS } from '@/lib/data'

export default function BestsellerSection() {
  return (
    <section style={{ position: 'relative', background: '#040404', width: '100%', height: 740, overflow: 'hidden' }}>
      <p style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 54, fontSize: 36, fontWeight: 500, color: 'white', whiteSpace: 'nowrap' }}>
        Choose From Our Bestseller Collection
      </p>
      <div style={{ position: 'absolute', left: 674.9, top: 113.9, background: '#d9d9d9', height: 3, width: 66 }} />

      {/* Cards */}
      <div style={{ position: 'absolute', left: 79, top: 160, display: 'flex', gap: 40 }}>
        {BESTSELLER_CARDS.map(card => (
          <div key={card.id} style={{ border: '1px solid rgba(255,255,255,0.33)', borderRadius: 14, width: 294, height: 375, position: 'relative', overflow: 'hidden', flexShrink: 0, background: '#040404' }}>
            <div style={{ position: 'absolute', left: 10, top: 13, width: 273, height: 170, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
              {card.imgCol && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.imgCol} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {!card.imgCol && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ASSETS.bestsellerCard} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
            <p style={{ position: 'absolute', left: 18, top: 208, fontSize: 20, fontWeight: 700 }}>{card.name}</p>
            <p style={{ position: 'absolute', left: 18, top: 242, fontSize: 14, color: '#6b7280' }}>Premium metal credit card</p>
            <div style={{ position: 'absolute', left: 18, top: 274, display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>₹{card.dprice ?? card.price}</span>
              {card.dprice && (
                <span style={{ position: 'relative', marginLeft: 12 }}>
                  <span style={{ fontSize: 11, color: '#555' }}>₹{card.price}</span>
                  <span style={{ position: 'absolute', height: 1, background: '#a5a5a5', width: '110%', top: '50%', left: '-5%', transform: 'rotate(-15.81deg)', display: 'block' }} />
                </span>
              )}
              {card.dprice && <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', marginLeft: 10 }}>Save ₹{card.price - card.dprice}</span>}
            </div>
            <Link href={`/product/${card.id}`}
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 16, width: 235, height: 28, background: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'black' }}>Buy Now</span>
            </Link>
          </div>
        ))}
      </div>

      <Link href="/collection"
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 604.9, background: 'rgba(255,255,255,0.06)', border: '1px solid #333', borderRadius: 8, height: 44, width: 148, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>View All</span>
      </Link>
    </section>
  )
}
