import type {Metadata} from "next"
import {Suspense} from "react"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {CalendarView} from "@/components/calendar-view"
// Remove the Skeleton import

export const metadata: Metadata = {
    title: "Calendar | JobTrackr",
    description: "View your job application events and deadlines",
}

// Replace the CalendarSkeleton with a simple div for loading
function CalendarSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="h-8 w-[180px] bg-muted animate-pulse rounded-md"/>
                {/* Month/year display */}
                <div className="h-9 w-[280px] bg-muted animate-pulse rounded-md"/>
                {/* Navigation controls */}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({length: 7}).map((_, i) => (
                    <div key={`day-${i}`} className="h-8 w-full bg-muted animate-pulse rounded-md"/>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({length: 35}).map((_, i) => (
                    <div key={`cell-${i}`} className="h-24 w-full bg-muted animate-pulse rounded-md"/>
                ))}
            </div>
        </div>
    )
}

export default function CalendarPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Calendar" text="Track important dates and deadlines."/>
            <div className="grid gap-8">
                <Suspense fallback={<CalendarSkeleton/>}>
                    <CalendarView/>
                </Suspense>
            </div>
        </DashboardShell>
    )
}

