import type {Metadata} from "next"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {ApplicationsList} from "@/components/applications-list"
import {ApplicationsTableFilter} from "@/components/applications-table-filter"
import {Button} from "@/components/ui/button"
import {FilterProvider} from "@/contexts/filter-context"
import Link from "next/link"
import {Plus} from "lucide-react"

export const metadata: Metadata = {
    title: "Applications | JobTrackr",
    description: "Manage your job applications",
}

export default function ApplicationsPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Applications" text="Manage your job applications.">
                <Button asChild>
                    <Link href="/applications/new">
                        <Plus className="mr-2 h-4 w-4"/>
                        Add New
                    </Link>
                </Button>
            </DashboardHeader>
            <FilterProvider>
                <div>
                    <ApplicationsTableFilter/>
                    <ApplicationsList/>
                </div>
            </FilterProvider>
        </DashboardShell>
    )
}

