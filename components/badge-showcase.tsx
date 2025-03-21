"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { statusVariantMap } from "@/lib/utils"

export function BadgeShowcase() {
  const statuses = [
    "Applied",
    "Phone Screen",
    "Interview",
    "Technical Interview",
    "Onsite Interview",
    "Offer",
    "Rejected",
    "Accepted",
    "Declined",
  ]

  const interviewTypes = ["Technical", "HR", "Final", "Phone"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Color Showcase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Application Statuses</h3>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Badge key={status} variant={statusVariantMap[status] as any}>
                {status}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Interview Types</h3>
          <div className="flex flex-wrap gap-2">
            {interviewTypes.map((type) => (
              <Badge key={type} variant={statusVariantMap[type] as any}>
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Default Badge Variants</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

