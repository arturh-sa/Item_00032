import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, DollarSign, Globe, User, Mail, Phone } from "lucide-react"
import { statusVariantMap } from "@/lib/utils"

interface ApplicationDetailProps {
  application: {
    id: string
    company: string
    position: string
    status: string
    dateApplied: string
    location?: string
    salary?: string
    description?: string
    contactName?: string
    contactEmail?: string
    contactPhone?: string
    url?: string
  }
}

export function ApplicationDetail({ application }: ApplicationDetailProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg font-medium">{application.company}</span>
              </div>
              <Badge variant={statusVariantMap[application.status] as any}>{application.status}</Badge>
            </div>

            <div className="grid gap-3">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{application.location || "Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Applied: {application.dateApplied}</span>
                </div>
                {application.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{application.salary}</span>
                  </div>
                )}
                {application.url && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={application.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Job Posting
                    </a>
                  </div>
                )}
              </div>
            </div>

            {application.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Job Description</h3>
                <div className="rounded-md bg-muted p-4">
                  <p className="whitespace-pre-line">{application.description}</p>
                </div>
              </div>
            )}

            {(application.contactName || application.contactEmail || application.contactPhone) && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="rounded-md bg-muted p-4 grid gap-2">
                  {application.contactName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{application.contactName}</span>
                    </div>
                  )}
                  {application.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${application.contactEmail}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {application.contactEmail}
                      </a>
                    </div>
                  )}
                  {application.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${application.contactPhone}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {application.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

