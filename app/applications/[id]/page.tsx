import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ApplicationDetail } from "@/components/application-detail"
import { ApplicationTimeline } from "@/components/application-timeline"
import { ApplicationNotes } from "@/components/application-notes"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Application Details | JobTrackr",
  description: "View and manage your job application details",
}

// This would normally fetch from a database
const getApplication = (id: string) => {
  // Mock data for demonstration
  return {
    id,
    company: "Acme Inc",
    position: "Senior Frontend Developer",
    status: "Interview",
    dateApplied: "2023-10-15",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description: "Senior Frontend Developer position with focus on React and Next.js",
    contactName: "Jane Smith",
    contactEmail: "jane.smith@acme.com",
  }
}

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const application = getApplication(params.id)

  if (!application) {
    notFound()
  }

  return (
    <DashboardShell>
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/applications">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <DashboardHeader
          heading={`${application.company} - ${application.position}`}
          text={`Applied on ${application.dateApplied}`}
        >
          <Button asChild>
            <Link href={`/applications/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </DashboardHeader>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <ApplicationDetail application={application} />
        </TabsContent>
        <TabsContent value="timeline">
          <ApplicationTimeline applicationId={params.id} />
        </TabsContent>
        <TabsContent value="notes">
          <ApplicationNotes applicationId={params.id} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

