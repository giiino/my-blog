import React, { ReactNode } from 'react'

export const AdminOnly = ({ children }: { children: ReactNode }) => {
  const isAdmin = true

  if (!isAdmin) {
    return null
  }
  return <>{children}</>
}
