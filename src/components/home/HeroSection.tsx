import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function HeroSection() {
  const benefits = [
    { icon1: ASSETS.benefitMovie1, icon2: ASSETS.benefitMovie2, rot1: '-14.69deg', rot2: '7.83deg',  label: '20% Off on\nMovie Tickets' },
    { icon1: ASSETS.benefitFood1,  icon2: ASSETS.benefitFood2,  rot1: '-15deg',    rot2: '56.45deg', label: '14% Off on\nFood & Dining' },
    { icon1: ASSETS.benefitTravel1,icon2: ASSETS.benefitTravel2,rot1: '-15deg',    rot2: '8deg',     label: '4% Off on\nTravel Booking' },
  ]

  return (
    <section style={{ position: 'relative', background: '#040404', width: '100%', height: 640, overflow: 'hidden' }}>
      {/* Video */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: 760, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pointerEvents: 'none' }}>
        <video autoPlay loop muted playsInline
          style={{ display: 'block', height: '100%', width: 'auto', maxWidth: 'none', objectFit: 'contain', objectPosition: 'right center' }}>
          <source src="/videos/hero-card.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Fades */}
      <div style={{ position: 'absolute', right: 430, top: 0, width: 260, height: '100%', background: 'linear-gradient(to right, #040404, rgba(0,0,0,0))', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: 800, height: 180, background: 'linear-gradient(to bottom, rgba(0,0,0,0), black)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content */}
      <h1 className="text-gradient-silver" style={{ position: 'absolute', left: 70, top: 80, fontSize: 54, fontWeight: 800, lineHeight: '58px', width: 562, zIndex: 3 }}>
        Get India&apos;s First Prepaid Metal Card
      </h1>
      <p style={{ position: 'absolute', left: 70, top: 220, fontSize: 20, color: '#dcdcdc', zIndex: 3 }}>
        Get 4% unlimited cashback on every spend
      </p>

      {/* Benefit boxes */}
      <div style={{ position: 'absolute', left: 71, top: 272, display: 'flex', gap: 14, zIndex: 3 }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ border: '0.3px solid rgba(255,255,255,0.7)', borderRadius: 10, width: 140, height: 128, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 3 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.icon1} alt="" style={{ width: 35, height: 35, borderRadius: 4, objectFit: 'cover', transform: `rotate(${b.rot1})`, ...(i === 2 ? { border: '0.1px solid white' } : {}) }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.icon2} alt="" style={{ width: 35, height: 35, borderRadius: 4, objectFit: 'cover', transform: `rotate(${b.rot2})`, ...(i === 2 ? { background: 'white' } : {}) }} />
            </div>
            <div style={{ position: 'absolute', bottom: 9, left: 0, right: 0, textAlign: 'center', fontSize: 15, color: '#ededed', lineHeight: '18px', whiteSpace: 'pre-line' }}>
              {b.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link href="/collection" style={{ position: 'absolute', left: 70, top: 424, background: 'white', borderRadius: 8, height: 48, width: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', zIndex: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'black' }}>Explore Luxury Finishes</span>
      </Link>

      <p style={{ position: 'absolute', left: 70, top: 496, fontSize: 16, color: '#9ca3af', zIndex: 3 }}>Powered by </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.visaLogo} alt="Visa" style={{ position: 'absolute', left: 166, top: 502, height: 19, width: 71, objectFit: 'cover', zIndex: 3 }} />
    </section>
  )
}
