'use client'
import { useState } from 'react'
import type { Review } from '@/types'

const GLOBAL_REVIEWS: Review[] = [
  { id: 1, name: 'Shruti N.', rating: 5, text: 'Not only do I love the Joker, I love the special request quote they were able to put on my card. The weight is perfect. I get compliments EVERYWHERE!', verified: true },
  { id: 2, name: 'Ankit C.',  rating: 5, text: 'Love the card! It looks great and gets tons of compliments. The design team was nice and extremely helpful. I\'ll definitely order one again!', verified: true },
  { id: 3, name: 'Tanvi C.', rating: 5, text: 'Omg i for sure am gonna get another. Great customer service and reply\'s super quick. Attention to detail great work!', verified: true },
  { id: 4, name: 'Arjun J.', rating: 5, text: 'The 1st card didn\'t work, BUT they were quick and kindly paid for the shipping fee for the replacement. This 2nd card works perfectly!', verified: true },
  { id: 5, name: 'Aditya T.', rating: 5, text: 'This card came in fast, in amazing packaging and with excellent customer service. Will order again for sure!', verified: true },
  { id: 6, name: 'Sahil S.',  rating: 5, text: 'Absolutely love my NeoZAP card! I get compliments on it all the time!! Great customer service and great turnaround time.', verified: true },
  { id: 7, name: 'Ritu C.',   rating: 5, text: 'I recently ordered a custom engraving card and I couldn\'t be happier! The process was smooth, received incredibly fast.', verified: true },
  { id: 8, name: 'Raj P.',    rating: 5, text: 'Honestly speechless. I freakin love this card. I went and bought a soda IMMEDIATELY just so I can use it 🤣', verified: true },
  { id: 9, name: 'Ankit S.', rating: 4, text: 'I love the way it looks. Customer service was so great handling the issue and they sorted everything quickly.', verified: true },
  { id: 10, name: 'Shruti T.', rating: 5, text: 'The weight is perfect, the finish is stunning. You\'re dealing with very kind and responsive people — 10/10!', verified: true },
]

const CARD_W = 404 // 380 + 24 gap

export default function ReviewsCarousel({ cardReviews }: { cardReviews?: Review[] }) {
  const reviews = cardReviews && cardReviews.length > 0 ? [...cardReviews, ...GLOBAL_REVIEWS] : GLOBAL_REVIEWS
  const [offset, setOffset] = useState(0)
  const maxOffset = reviews.length - 3

  return (
    <section style={{ width: '100%', padding: 60, background: '#080808' }}>
      <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 36 }}>
        Trusted by 5,000+ Customers
      </h2>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 24, transform: `translateX(-${offset * CARD_W}px)`, transition: 'transform 0.4s ease' }}>
          {reviews.map(r => (
            <div key={r.id} style={{ flexShrink: 0, width: 380, background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: 192, background: 'linear-gradient(135deg,#1a1a2e,#16213e)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.6))' }} />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{r.name}</span>
                  {r.verified && (
                    <span style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', fontSize: 11, padding: '3px 8px', borderRadius: 4 }}>Verified</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={{ width: 14, height: 14, background: i <= r.rating ? '#f59e0b' : '#333', clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }} />
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 28 }}>
        <button onClick={() => setOffset(o => Math.max(0, o - 1))}
          style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: 18, cursor: 'pointer' }}>
          ←
        </button>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {Array.from({ length: Math.max(1, maxOffset + 1) }).map((_, i) => (
            <div key={i} onClick={() => setOffset(i)} style={{ cursor: 'pointer', height: 8, borderRadius: 4, background: i === offset ? 'white' : 'rgba(255,255,255,0.25)', width: i === offset ? 20 : 8, transition: 'all .2s' }} />
          ))}
        </div>
        <button onClick={() => setOffset(o => Math.min(maxOffset, o + 1))}
          style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: 18, cursor: 'pointer' }}>
          →
        </button>
      </div>
    </section>
  )
}
