import Link from 'next/link'
import { ASSETS } from '@/lib/data'

export default function HomeFooter() {
  const paymentLogos = [
    { src: ASSETS.payVisa,       alt: 'Visa'       },
    { src: ASSETS.payMastercard, alt: 'Mastercard' },
    { src: ASSETS.payPhonePe,    alt: 'PhonePe'    },
    { src: ASSETS.payRazorpay,   alt: 'Razorpay'   },
    { src: ASSETS.payGPay,       alt: 'Google Pay' },
  ]

  return (
    <footer style={{ background: '#040404', width: '100%', padding: '60px 110px 52px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '370px 160px 160px 160px 180px', gap: 0 }}>
        {/* Brand */}
        <div>
          <div style={{ fontSize: 25, fontWeight: 700, background: 'linear-gradient(95.32deg,rgb(237,237,239) 3.75%,rgb(97,95,105) 95.24%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', marginBottom: 12 }}>
            NeoZAP
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', lineHeight: '22px', marginBottom: 28 }}>
            We convert your plastic credit and debit cards into premium,<br />durable metal cards. Stylish, secure, and built to impress.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['f', 'in', '𝕏', 'gh'].map(s => (
              <div key={s} style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#888', cursor: 'pointer' }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {[
          { heading: 'Services',      links: ['Exclusive Cards','Simple Cards','2 In 1 Cards','Multipurpose Cards','Business Cards'] },
          { heading: 'Company',       links: ['About','Meet the Team','Accounts Review'] },
          { heading: 'Helpful Links', links: ['Contact','FAQs','How We Work','Live Chat'] },
          { heading: 'Legal',         links: ['Terms and Condition','Privacy Policy','Cancellation Policy','Shipping Policy','Return Policy'] },
        ].map(col => (
          <div key={col.heading}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 18 }}>{col.heading}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(link => (
                <li key={link}>
                  <Link href="#" style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none' }}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '40px -110px 0' }} />
      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {paymentLogos.map(p => (
            <div key={p.alt} style={{ background: 'white', borderRadius: 4, height: 20, padding: '0 4px', display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} style={{ height: 14, width: 'auto', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#444' }}>© 2026 NeoZAP. All rights reserved.</p>
      </div>
    </footer>
  )
}
