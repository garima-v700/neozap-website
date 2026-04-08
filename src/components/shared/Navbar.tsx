'use client'
import Link from 'next/link'

interface NavbarProps {
  buyHref?: string
}

export default function Navbar({ buyHref = '/collection' }: NavbarProps) {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-logo">NeoZAP</Link>
      <Link href="/collection" className="nav-link">Collection</Link>
      <Link href={buyHref} className="nav-buy-btn">Buy Now</Link>
    </nav>
  )
}
