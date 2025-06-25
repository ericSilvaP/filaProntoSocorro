'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideHeaderRoutes = ['/login', '/']

  const showHeader = !hideHeaderRoutes.includes(pathname)

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  )
}
