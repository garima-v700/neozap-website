import { ASSETS } from '@/lib/data'

export default function SecuritySection() {
  return (
    <section style={{ background: 'black', width: '100%', height: 565, overflow: 'hidden', position: 'relative' }}>
      <p style={{ position: 'absolute', left: 79, top: 51, fontSize: 54, fontWeight: 700, lineHeight: '58px', color: 'white', width: 666 }}>
        Unbreakable standard of security &amp; convenience
      </p>
      <div style={{ position: 'absolute', left: 79, top: 217, width: 666, height: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ASSETS.secDivider} alt="" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ASSETS.securityImg} alt="Security features"
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 245, width: 1281.5, height: 264.5, objectFit: 'cover' }} />
    </section>
  )
}
