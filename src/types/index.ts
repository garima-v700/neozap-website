export interface CardColor {
  hex: string
  name: string
}

export interface Review {
  id: number
  name: string
  rating: number
  text: string
  verified: boolean
}

export interface Card {
  id: number
  name: string
  category: string
  sku?: string
  price: number
  dprice?: number | null
  disc?: number | null
  desc?: string
  features?: string[]
  bestseller?: boolean
  priority?: number | null
  colors?: CardColor[]
  reviews?: Review[]
  imgCol?: string | null   // collection page image
  imgChip?: string | null  // product page image (with chip overlay)
  imgBack?: string | null  // back of card
}

export interface Category {
  id: string
  label: string
  icon?: string | null
}
