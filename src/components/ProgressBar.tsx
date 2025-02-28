import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Configure NProgress
NProgress.configure({ showSpinner: true, speed: 1000, minimum: 0.2 })

export const ProgressBar = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Start NProgress
    NProgress.start()

    // Simulate a delay for better UX (e.g., for fast page loads)
    const timer = setTimeout(() => {
      NProgress.done()
    }, 1000) // Adjust timing as needed

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname]) // Runs when pathname changes

  return null // No UI needed, just triggers NProgress
}
