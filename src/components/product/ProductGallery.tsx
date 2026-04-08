'use client'
import { useState, useRef } from 'react'
import type { Card, CardColor } from '@/types'

function ChipSVG() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="51" height="39" rx="5.5" fill="#c8a84b" stroke="#a0882a"/>
      <rect x="3" y="3" width="46" height="34" rx="4" fill="none" stroke="rgba(255,220,100,0.6)" strokeWidth="0.5"/>
      <line x1="17" y1="0" x2="17" y2="40" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="35" y1="0" x2="35" y2="40" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="0" y1="13" x2="52" y2="13" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <line x1="0" y1="27" x2="52" y2="27" stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
      <rect x="17" y="13" width="18" height="14" rx="2" fill="rgba(180,140,40,0.4)"/>
    </svg>
  )
}

const SLIDE_LABELS = [
  'Mirror Silver — Real Shot #1',
  'Matt Black — Real Shot #2',
  'Gold — Real Shot #3',
  'Rose Gold — Real Shot #4',
  'Gunmetal — Real Shot #5',
  'Navy Blue — Real Shot #6',
  'Titanium — Real Shot #7',
]

const SLIDE_GRADIENTS = [
  'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
  'linear-gradient(135deg,#2a1a0e,#3e2516,#603a0f)',
  'linear-gradient(135deg,#1a2a1a,#163e16,#0f600f)',
  'linear-gradient(135deg,#2a1a2a,#3e163e,#600f60)',
  'linear-gradient(135deg,#2a2a1a,#3e3e16,#60600f)',
  'linear-gradient(135deg,#0e1a2a,#16253e,#0f3060)',
  'linear-gradient(135deg,#1a1010,#2e1616,#501010)',
]

interface Props {
  card: Card
  selectedColor: CardColor | null
}

export default function ProductGallery({ card, selectedColor }: Props) {
  const [idx, setIdx] = useState(0)
  const total = card.imgChip ? SLIDE_LABELS.length : SLIDE_LABELS.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const mouseStartX = useRef(0)
  const isDragging = useRef(false)

  const go = (i: number) => setIdx(Math.max(0, Math.min(total - 1, i)))

  const hueColor = selectedColor?.hex ?? null

  return (
    <div style={{ width: 440, position: 'relative' }}>
      {/* Viewport */}
      <div
        ref={viewportRef}
        style={{ width: 440, height: 300, borderRadius: 12, overflow: 'hidden', cursor: 'grab', position: 'relative' }}
        onMouseDown={e => { mouseStartX.current = e.clientX; isDragging.current = true; e.preventDefault() }}
        onMouseUp={e => {
          if (!isDragging.current) return
          isDragging.current = false
          const diff = mouseStartX.current - e.clientX
          if (Math.abs(diff) > 40) go(diff > 0 ? idx + 1 : idx - 1)
        }}
      >
        {/* Track */}
        <div style={{ display: 'flex', height: '100%', transform: `translateX(-${idx * 440}px)`, transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)' }}>
          {SLIDE_LABELS.map((label, i) => (
            <div key={i} style={{ flexShrink: 0, width: 440, height: 300, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: SLIDE_GRADIENTS[i] }}>
              {/* Real image if available */}
              {i === 0 && card.imgChip && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.imgChip} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  {/* Hue overlay for selected color */}
                  {hueColor && (
                    <div style={{ position: 'absolute', inset: 0, background: hueColor, mixBlendMode: 'hue' as const, opacity: 0.6 }} />
                  )}
                  {/* Chip overlay */}
                  <div style={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <ChipSVG />
                  </div>
                </>
              )}
              {i === 0 && !card.imgChip && (
                <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />
              )}
              {i > 0 && card.imgCol && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.imgCol} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  {hueColor && (
                    <div style={{ position: 'absolute', inset: 0, background: hueColor, mixBlendMode: 'hue' as const, opacity: 0.6 }} />
                  )}
                </>
              )}
              {i > 0 && !card.imgCol && (
                <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.12)', borderRadius: '50%' }} />
              )}
              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.72)', height: 38, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => go(idx - 1)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          ←
        </button>
        <button onClick={() => go(idx + 1)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.18)', color: 'white', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          →
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0 0' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} onClick={() => go(i)} style={{ cursor: 'pointer', height: 8, borderRadius: 4, background: i === idx ? 'white' : 'rgba(255,255,255,0.25)', width: i === idx ? 20 : 8, transition: 'all .2s' }} />
        ))}
      </div>
    </div>
  )
}
