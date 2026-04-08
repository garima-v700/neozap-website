import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import CollectionClient from '@/components/collection/CollectionClient'
import { fetchCatalog, DEFAULT_CATEGORIES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Collection – NeoZAP Metal Cards',
  description: 'Browse our full collection of premium metal cards.',
}

export default async function CollectionPage() {
  const catalog = await fetchCatalog()
  const cards      = catalog?.cards      ?? []
  const categories = catalog?.categories ?? DEFAULT_CATEGORIES

  return (
    <>
      <Navbar buyHref="/collection" />
      <main style={{ background: '#080808', minHeight: '100vh' }}>
        <div style={{ padding: '50px 60px 0' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>Explore by category</h2>
          <p style={{ fontSize: 16, color: '#9ca3af' }}>
            Real life shots of our premium metal cards. Each handcrafted to perfection.
          </p>
        </div>
        <CollectionClient cards={cards} categories={categories} />
      </main>
      <Footer />
    </>
  )
}
