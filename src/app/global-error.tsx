'use client'

import React, { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[G8G Media Global Error]', error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-[#0A0D08] text-[#F3F4F6] min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md text-center space-y-4">
          <span className="font-mono text-xs text-[#C5FF62] uppercase tracking-widest px-2.5 py-1 rounded bg-[#C5FF62]/10 border border-[#C5FF62]/20">
            SYSTEM HOLD
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white">System Interruption</h1>
          <p className="text-sm text-gray-400">
            A critical application error occurred. Please refresh or retry.
          </p>
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 rounded bg-[#C5FF62] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Retry Sequence
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
