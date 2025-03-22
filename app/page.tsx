import type {Metadata} from "next"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {ApplicationsOverview} from "@/components/applications-overview"
import {RecentApplications} from "@/components/recent-applications"
import {UpcomingInterviews} from "@/components/upcoming-interviews"

export const metadata: Metadata = {
    title: "Dashboard | JobTrackr",
    description: "Track and manage your job applications in one place",
}

export default function DashboardPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Dashboard" text="Track and manage your job applications in one place."/>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <ApplicationsOverview className="w-full md:col-span-2 lg:col-span-4"/>
                <div className="w-full md:col-span-2 lg:col-span-3 space-y-4">
                    <UpcomingInterviews className="w-full"/>
                    <RecentApplications className="w-full"/>
                </div>
            </div>
        </DashboardShell>
    )
}

