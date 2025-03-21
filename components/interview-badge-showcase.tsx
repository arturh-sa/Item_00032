"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { statusVariantMap } from "@/lib/utils"
import { Code, Users, CheckCircle, Phone, Calendar, Clock } from "lucide-react"
import { upcomingInterviews } from "@/components/upcoming-interviews"
import { format } from "date-fns"

export function InterviewBadgeShowcase() {
  const interviewTypes = [
    { type: "Technical", icon: <Code className="mr-1 h-3 w-3" /> },
    { type: "HR", icon: <Users className="mr-1 h-3 w-3" /> },
    { type: "Final", icon: <CheckCircle className="mr-1 h-3 w-3" /> },
    { type: "Phone Screen", icon: <Phone className="mr-1 h-3 w-3" /> },
  ]

  const statusTypes = [
    { type: "Upcoming", description: "Interviews scheduled in the future" },
    { type: "Completed", description: "Interviews that have already taken place" },
  ]

  // Use the actual TechCorp interview data from the shared data
  const techCorpExample = upcomingInterviews.find(
    (interview) => interview.company === "TechCorp" && interview.type === "Technical",
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Badge Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Interview Types</h3>
          <div className="flex flex-wrap gap-2">
            {interviewTypes.map((interview) => (
              <Badge
                key={interview.type}
                variant={statusVariantMap[interview.type]?.toLowerCase() as any}
                className="flex items-center"
              >
                {interview.icon}
                {interview.type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Interview Status</h3>
          <div className="flex flex-wrap gap-2">
            {statusTypes.map((status) => (
              <div key={status.type} className="flex flex-col space-y-1">
                <Badge variant={statusVariantMap[status.type]?.toLowerCase() as any}>{status.type}</Badge>
                <span className="text-xs text-muted-foreground">{status.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">TechCorp Technical Interview Example</h3>
          <div className="flex flex-col space-y-4">
            {techCorpExample && (
              <div className="flex items-start space-x-4 rounded-md border p-3">
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{techCorpExample.company}</p>
                  <p className="text-sm text-muted-foreground">{techCorpExample.position}</p>
                  <div className="flex items-center pt-2">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{techCorpExample.date}</span>
                    <Clock className="ml-3 mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{techCorpExample.time}</span>
                  </div>
                </div>
                <Badge
                  variant={statusVariantMap[techCorpExample.type]?.toLowerCase() as any}
                  className="flex items-center"
                >
                  <Code className="mr-1 h-3 w-3" />
                  {techCorpExample.type}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Calendar View Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border rounded-md">
            {upcomingInterviews
              .filter((interview) => interview.status === "Upcoming")
              .map((interview) => (
                <div key={interview.id} className="p-2 border rounded-md">
                  <div className="text-xs font-medium mb-1">{format(new Date(interview.date), "MMM d")}</div>
                  <Badge
                    variant={statusVariantMap[interview.type]?.toLowerCase() as any}
                    className="flex items-center text-xs w-full justify-center"
                  >
                    {interview.type === "Technical" && <Code className="mr-1 h-3 w-3" />}
                    {interview.type === "HR" && <Users className="mr-1 h-3 w-3" />}
                    {interview.type === "Final" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {interview.type === "Phone Screen" && <Phone className="mr-1 h-3 w-3" />}
                    {interview.type}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1 truncate">{interview.company}</div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

