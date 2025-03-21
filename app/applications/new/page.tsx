import type {Metadata} from "next"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {ApplicationForm} from "@/components/application-form"

export const metadata: Metadata = {
    title: "New Application | JobTrackr",
    description: "Add a new job application",
}

export default function NewApplicationPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Add New Application" text="Create a new job application entry."/>
            <div className="grid gap-8">
                <ApplicationForm/>
            </div>
        </DashboardShell>
    )
}

