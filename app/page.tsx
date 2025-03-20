import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ApplicationsOverview } from "@/components/applications-overview"
import { RecentApplications } from "@/components/recent-applications"
import { UpcomingInterviews } from "@/components/upcoming-interviews"
import { StatsCards } from "@/components/stats-cards"

export const metadata: Metadata = {
  title: "Dashboard | JobTrackr",
  description: "Track and manage your job applications in one place",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Track and manage your job applications in one place." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ApplicationsOverview className="col-span-4" />
        <div className="col-span-3 space-y-4">
          <UpcomingInterviews />
          <RecentApplications />
        </div>
      </div>
    </DashboardShell>
  )
}

