"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ApplicationStatusChart } from "@/components/application-status-chart"

interface ApplicationsOverviewProps {
  className?: string
}

export function ApplicationsOverview({ className }: ApplicationsOverviewProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Applications Overview</CardTitle>
        <CardDescription>Your application status distribution</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ApplicationStatusChart />
      </CardContent>
    </Card>
  )
}

