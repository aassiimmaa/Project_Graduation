import React from 'react'
import DashboardClientWrapper from './DashboardClientWrapper'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <DashboardClientWrapper>{children}</DashboardClientWrapper>
}
