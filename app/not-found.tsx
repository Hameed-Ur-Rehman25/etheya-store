import Link from 'next/link'
import { Button } from '@/src/shared/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link href="/">
          <Button className="bg-black text-white hover:bg-gray-800">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
