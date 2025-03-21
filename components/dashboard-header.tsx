import type React from "react"
interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="grid gap-1">
      <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
      {text && <p className="text-lg text-muted-foreground">{text}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}

