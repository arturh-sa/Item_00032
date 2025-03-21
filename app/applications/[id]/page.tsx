"use client"

import {useEffect} from "react"
import {useParams, useRouter} from "next/navigation"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {ApplicationDetail} from "@/components/application-detail"
import {ApplicationTimeline} from "@/components/application-timeline"
import {ApplicationNotes} from "@/components/application-notes"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Edit, ArrowLeft} from "lucide-react"
import Link from "next/link"
import {useApplications} from "@/contexts/applications-context"

export default function ApplicationDetailPage() {
    const params = useParams()
    const router = useRouter()
    const {getApplication} = useApplications()

    const id = typeof params.id === "string" ? params.id : params.id?.[0] || ""
    const application = getApplication(id)

    // Redirect to applications page if application not found
    useEffect(() => {
        if (!application) {
            router.push("/applications")
        }
    }, [application, router])

    if (!application) {
        return null
    }

    return (
        <DashboardShell>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2" asChild>
                        <Link href="/applications">
                            <ArrowLeft className="h-4 w-4 mr-1"/>
                            Back
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <DashboardHeader
                        heading={`${application.company} - ${application.position}`}
                        text={`Applied on ${application.dateApplied}`}
                    />
                    <Button asChild>
                        <Link href={`/applications/${id}/edit`}>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </Link>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <ApplicationDetail application={application}/>
                </TabsContent>
                <TabsContent value="timeline">
                    <ApplicationTimeline/>
                </TabsContent>
                <TabsContent value="notes">
                    <ApplicationNotes/>
                </TabsContent>
            </Tabs>
        </DashboardShell>
    )
}

