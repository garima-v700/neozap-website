'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function StickyCTA() {
  const [time, setTime] = useState({ h: 0, m: 14, s: 47 })

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="sticky-cta">
      <div className="cta-timer-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.clockIcon} alt="" style={{ width: 18, height: 18, filter: 'brightness(10)' }} />
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, fontWeight: 600, color: 'white' }}>
          Offer Ends In: {pad(time.h)} : {pad(time.m)} : {pad(time.s)}
        </span>
      </div>

      <div className="cta-offer-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.ctaBall} alt=""
          style={{ position: 'absolute', left: 147, top: 0, width: 126, height: 87, objectFit: 'cover', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,9,7,0.5)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 151 }}>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 500, color: '#4fabff', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Limited Time offer
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'Roboto,sans-serif', fontSize: 22, color: 'white' }}>MRP</span>
            <span style={{ fontFamily: 'Roboto,sans-serif', fontSize: 22, color: 'white', position: 'relative' }}>
              ₹999
              <span style={{ position: 'absolute', width: '108%', height: 2, background: 'white', top: '50%', left: '-4%', transform: 'rotate(-12deg)', display: 'block' }} />
            </span>
          </div>
        </div>
        <Link href="/collection"
          className="btn-blue-gradient"
          style={{ position: 'absolute', right: 101, top: '50%', transform: 'translateY(-50%)', zIndex: 10, padding: '0 22px', height: 38, display: 'flex', alignItems: 'center', textDecoration: 'none', borderRadius: 4 }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: 18, color: 'white', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            BUY NOW @ ₹499
          </span>
        </Link>
      </div>
    </div>
  )
}
