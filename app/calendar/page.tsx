import type { Metadata } from "next"
import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CalendarView } from "@/components/calendar-view"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Calendar | JobTrackr",
  description: "View your job application events and deadlines",
}

// Loading component for the calendar
function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={`day-${i}`} className="h-8 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={`cell-${i}`} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Calendar" text="Track important dates and deadlines." />
      <div className="grid gap-8">
        <Suspense fallback={<CalendarSkeleton />}>
          <CalendarView />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

