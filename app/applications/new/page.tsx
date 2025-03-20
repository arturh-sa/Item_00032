import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ApplicationForm } from "@/components/application-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "New Application | JobTrackr",
  description: "Add a new job application",
}

export default function NewApplicationPage() {
  return (
    <DashboardShell>
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/applications">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <DashboardHeader heading="Add New Application" text="Create a new job application entry." />
      </div>
      <div className="grid gap-8">
        <ApplicationForm />
      </div>
    </DashboardShell>
  )
}

