import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">404</p>
        <h1 className="mb-4 font-nav text-5xl font-semibold uppercase tracking-normal text-dark md:text-6xl">
          Page not found
        </h1>
        <p className="text-muted mb-10">
          Looks like you&apos;ve wandered off the map. Let&apos;s get you back to making friends.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-lync text-white font-semibold px-8 py-4 rounded-full hover:bg-lync-dark transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
