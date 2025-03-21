import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface ApplicationTimelineEventProps {
  event: {
    id: string
    date: string
    type: string
    notes?: string
  }
}

const statusVariantMap: { [key: string]: string } = {
  Applied: "default",
  Interview: "secondary",
  Offer: "success",
  Rejected: "destructive",
}

export function ApplicationTimelineEvent({ event }: ApplicationTimelineEventProps) {
  return (
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant={(statusVariantMap[event.type] as any) || "default"}>{event.type}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            {event.date}
          </div>
        </div>
        {event.notes && <div className="mt-2 text-sm">{event.notes}</div>}
      </div>
    </div>
  )
}

