'use client'
import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/data'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const half = Math.ceil(FAQ_ITEMS.length / 2)
  const left  = FAQ_ITEMS.slice(0, half)
  const right = FAQ_ITEMS.slice(half)

  const Item = ({ item, index }: { item: typeof FAQ_ITEMS[0]; index: number }) => (
    <div style={{ marginBottom: 24 }}>
      <div
        onClick={() => setOpen(open === index ? null : index)}
        style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
        <div style={{ background: '#262626', borderRadius: 4, width: 25, height: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{index + 1}</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{item.q}</p>
          {open === index && (
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: '18px', width: 458, marginTop: 8 }}>{item.a}</p>
          )}
        </div>
        <span style={{ color: '#6b7280', fontSize: 14, marginLeft: 8 }}>{open === index ? '▲' : '▼'}</span>
      </div>
    </div>
  )

  return (
    <section style={{ background: '#040404', width: '100%', minHeight: 712, position: 'relative', padding: '52px 159px 60px' }}>
      <h2 style={{ textAlign: 'center', fontSize: 38, fontWeight: 800, color: 'white', marginBottom: 12 }}>
        Common Questions &amp; Answers
      </h2>
      <p style={{ textAlign: 'center', fontSize: 17, color: '#9ca3af', marginBottom: 48 }}>
        Find out all the essential details about our platform and how it can serve your needs.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
        <div>{left.map((item, i)  => <Item key={i} item={item} index={i} />)}</div>
        <div>{right.map((item, i) => <Item key={i} item={item} index={i + half} />)}</div>
      </div>
    </section>
  )
}
