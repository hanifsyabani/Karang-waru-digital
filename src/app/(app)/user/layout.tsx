import ProtectedUserLayout from '@/components/layout/protected-user-layout'
import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedUserLayout>
      {children}
    </ProtectedUserLayout>
  )
}
