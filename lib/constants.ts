import { Product, Category } from '@/types'

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Yellow']

export const SUB_CATEGORIES = ['GenZ', 'Jhalak', 'Sada']

export const AVAILABILITY_OPTIONS = [
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'pre-order', label: 'Pre-Order' }
]

export const TYPE_OPTIONS = [
  { value: 'shirt', label: 'Shirt' },
  { value: 'trouser', label: 'Trouser' },
  { value: 'suit', label: 'Suit' },
  { value: 'dress', label: 'Dress' },
  { value: 'kurta', label: 'Kurta' },
  { value: 'dupatta', label: 'Dupatta' }
]

export const FABRIC_OPTIONS = [
  { value: 'cotton', label: 'Cotton' },
  { value: 'silk', label: 'Silk' },
  { value: 'chiffon', label: 'Chiffon' },
  { value: 'lawn', label: 'Lawn' },
  { value: 'linen', label: 'Linen' },
  { value: 'georgette', label: 'Georgette' },
  { value: 'organza', label: 'Organza' }
]

export const PIECES_OPTIONS = [
  { value: '1-piece', label: '1 Piece' },
  { value: '2-piece', label: '2 Piece' },
  { value: '3-piece', label: '3 Piece' },
  { value: '4-piece', label: '4 Piece' }
]

export const PRICE_RANGES = {
  MIN: 0,
  MAX: 50000,
  STEP: 1000
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' }
] as const
