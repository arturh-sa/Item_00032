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

const typeColorMap: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Phone Screen": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Technical Interview": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Onsite Interview": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Offer: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Accepted: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  Declined: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
}

export function ApplicationTimelineEvent({ event }: ApplicationTimelineEventProps) {
  return (
    <div className="flex gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            className={typeColorMap[event.type] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}
          >
            {event.type}
          </Badge>
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

