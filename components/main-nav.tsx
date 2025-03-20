"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BriefcaseBusiness } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BriefcaseBusiness className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">JobTrackr</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/applications"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/applications") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Applications
        </Link>
        <Link
          href="/calendar"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/calendar") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Calendar
        </Link>
      </nav>
    </div>
  )
}

