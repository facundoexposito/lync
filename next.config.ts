import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/brand/**',
        // no `search` → optional ?v= cache-bust on any brand asset
      },
    ],
  },
}

export default nextConfig
