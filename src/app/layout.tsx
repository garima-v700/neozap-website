import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "NeoZAP – India's First Prepaid Metal Card",
  description: 'Get 4% unlimited cashback on every spend. Premium metal credit cards with laser-engraved designs.',
  keywords: 'metal card, prepaid card, NeoZAP, India, premium card',
  openGraph: {
    title: "NeoZAP – India's First Prepaid Metal Card",
    description: 'Premium metal credit cards with laser-engraved designs.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
