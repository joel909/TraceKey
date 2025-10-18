// components/ClientWrapper.tsx
'use client' // ✅ This makes it a Client Component

import { ReactNode } from 'react'

interface ClientWrapperProps {
  children: ReactNode
  userData: any
}

export default function ClientWrapper({ children, userData }: ClientWrapperProps) {
  return (
    <div>
      {children}
    </div>
  )
}
