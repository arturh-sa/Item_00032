"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EditApplicationForm } from "@/components/edit-application-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useApplications } from "@/contexts/applications-context"

export default function EditApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const { getApplication } = useApplications()

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
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href={`/applications/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <DashboardHeader
          heading={`Edit Application: ${application.company}`}
          text="Update your job application details."
        />
      </div>
      <div className="grid gap-8">
        <EditApplicationForm application={application} />
      </div>
    </DashboardShell>
  )
}

