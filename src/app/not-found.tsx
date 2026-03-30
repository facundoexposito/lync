import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl font-bold text-lync-navy mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-lync-navy mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you've wandered off the map. Let's get you back to making friends!
        </p>
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
