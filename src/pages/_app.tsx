import { AppNavbar } from '@/components/NavBar/AppNavbar'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { ProgressBar } from '@/components/ProgressBar'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log('NextNProgress is loaded')

  return (
    <SessionProvider session={session}>
      <ProgressBar />
      <AppNavbar />

      <Component {...pageProps} />
    </SessionProvider>
  )
}
