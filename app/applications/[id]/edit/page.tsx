"use client"

import {useEffect} from "react"
import {useParams, useRouter} from "next/navigation"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {EditApplicationForm} from "@/components/edit-application-form"
import {useApplications} from "@/contexts/applications-context"

export default function EditApplicationPage() {
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
            <div className="flex items-center">
                <DashboardHeader
                    heading={`Edit Application: ${application.company}`}
                    text="Update your job application details."
                />
            </div>
            <div className="grid gap-8">
                <EditApplicationForm application={application}/>
            </div>
        </DashboardShell>
    )
}

