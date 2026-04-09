import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function ConvertSection() {
  return (
    <section style={{ background: 'black', width: '100%', height: 640, overflow: 'hidden', position: 'relative' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', left: -304, top: -260, width: 766, height: 766, pointerEvents: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.convertGlow} alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Video on the right instead of image */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          right: 111,
          top: '50%',
          transform: 'translateY(calc(-50% + 18px))',
          width: 537,
          height: 363,
          objectFit: 'cover',
          borderRadius: 12,
        }}
      >
        <source src="/videos/cardVideo.webm" type="video/webm" />
      </video>

      {/* Left content */}
      <p style={{ position: 'absolute', left: 85, top: 84, fontSize: 26, color: '#d6d6d6' }}>
        Don&apos;t want a new card?
      </p>
      <h2 className="text-gradient-silver"
        style={{ position: 'absolute', left: 85, top: 149, fontSize: 55, fontWeight: 800, lineHeight: '66px', width: 660 }}>
        Convert Your Plastic Payment Card to Metal
      </h2>
      <p style={{ position: 'absolute', left: 85, top: 303.97, fontSize: 25, color: 'rgba(214,214,214,0.82)', width: 449 }}>
        Works like your existing payment card
      </p>
      <p style={{ position: 'absolute', left: 85, top: 396, fontSize: 25, color: '#d6d6d6' }}>
        FREE Movie Tickets worth <strong>₹300</strong>
      </p>
      <Link href="/collection"
        style={{ position: 'absolute', left: 85, top: 484, background: 'white', borderRadius: 13, height: 79, width: 377, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
        <span style={{ fontSize: 23, fontWeight: 600, color: 'black', whiteSpace: 'nowrap' }}>Explore Luxury Finishes</span>
      </Link>
    </section>
  )
}
