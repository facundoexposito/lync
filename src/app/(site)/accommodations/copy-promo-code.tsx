'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyPromoCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-white/40 bg-white/10 px-6 py-3 font-mono text-lg font-bold tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
    >
      {code}
      {copied ? <Check size={18} /> : <Copy size={18} />}
    </button>
  )
}
