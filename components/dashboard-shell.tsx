import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid items-start gap-8 w-full">
      <main className="container mx-auto grid gap-6 py-8 px-4 md:px-6">{children}</main>
    </div>
  )
}

