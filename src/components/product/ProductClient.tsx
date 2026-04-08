'use client'
import { useState } from 'react'
import ProductGallery from './ProductGallery'
import type { Card, CardColor } from '@/types'

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 16, height: 16, background: i <= rating ? '#f59e0b' : '#333', clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }} />
      ))}
    </div>
  )
}

export default function ProductClient({ card }: { card: Card }) {
  const [selectedColor, setSelectedColor] = useState<CardColor | null>(card.colors?.[0] ?? null)
  const [qty, setQty] = useState(1)
  const [name, setName] = useState('')

  const price = card.dprice ?? card.price
  const avgRating = card.reviews?.length
    ? Math.round(card.reviews.reduce((a, r) => a + r.rating, 0) / card.reviews.length)
    : 5

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '440px 1fr', gap: 60, alignItems: 'start', padding: '0 60px 60px' }}>
      {/* LEFT */}
      <div>
        <ProductGallery card={card} selectedColor={selectedColor} />

        {/* Colour swatches */}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 18, marginBottom: 10 }}>
          Selected Colour: <span style={{ color: 'white', fontWeight: 500 }}>{selectedColor?.name ?? 'None'}</span>
        </p>
        {card.colors && card.colors.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {card.colors.map(c => (
              <div key={c.hex} onClick={() => setSelectedColor(c)} title={c.name}
                style={{ width: 40, height: 40, borderRadius: '50%', background: c.hex, cursor: 'pointer', border: `2px solid ${selectedColor?.hex === c.hex ? 'white' : 'rgba(255,255,255,0.2)'}`, transition: 'border-color .2s' }} />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div>
        <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>{card.name}</h1>
        {card.sku && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>SKU: {card.sku}</p>}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 40, fontWeight: 700 }}>₹{price.toLocaleString('en-IN')}</span>
          {card.dprice && (
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>₹{card.price.toLocaleString('en-IN')}</span>
              <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1.5, background: 'rgba(255,255,255,0.5)', transform: 'rotate(-8deg)', display: 'block' }} />
            </span>
          )}
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <Stars rating={avgRating} />
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>({card.reviews?.length ?? 0})</span>
        </div>

        {/* Description */}
        {card.desc && (
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: 20, maxWidth: 465 }}>{card.desc}</p>
        )}

        {/* Features */}
        {card.features && card.features.length > 0 && (
          <>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Key Features:</p>
            <ul style={{ listStyle: 'none', marginBottom: 24 }}>
              {card.features.map((f, i) => (
                <li key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>• {f}</li>
              ))}
            </ul>
          </>
        )}

        {/* Quantity */}
        <div style={{ width: 89, height: 38, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', marginBottom: 20 }}>
          <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer', lineHeight: 1, fontFamily: 'Inter,sans-serif' }}>−</button>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', color: 'white', fontSize: 18, cursor: 'pointer', lineHeight: 1, fontFamily: 'Inter,sans-serif' }}>+</button>
        </div>

        {/* Name input */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Please enter your name</p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="ENTER YOUR NAME (WILL COME PRINTED ON THE BACK OF THE CARD)"
          style={{ width: 580, height: 42, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'Inter,sans-serif', padding: '0 14px', letterSpacing: '0.03em', outline: 'none' }}
        />

        {/* Add to cart */}
        <button
          className="btn-blue-gradient"
          style={{ width: 580, height: 48, borderRadius: 8, fontSize: 16, fontWeight: 600, marginTop: 16, display: 'block' }}
          onClick={() => alert(`Added ${qty}x ${card.name} (${selectedColor?.name ?? ''}) to cart!`)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
