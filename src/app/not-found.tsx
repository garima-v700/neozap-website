import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ background: '#040404', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 80, fontWeight: 800, background: 'linear-gradient(95.32deg, rgb(237,237,239) 3.75%, rgb(97,95,105) 95.24%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        404
      </div>
      <p style={{ fontSize: 20, color: '#9ca3af', marginBottom: 8 }}>Page not found</p>
      <Link href="/" style={{ background: 'white', color: 'black', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
        Back to Home
      </Link>
    </div>
  )
}
