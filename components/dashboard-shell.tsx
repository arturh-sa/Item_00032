import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid items-start gap-8">
      <main className="container grid gap-6 py-8">{children}</main>
    </div>
  )
}

