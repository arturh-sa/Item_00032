"use client"

import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parse } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation"

// Mock data for demonstration
const events = [
  {
    id: "1",
    title: "Phone Screen - TechCorp",
    date: "2023-11-15",
    type: "interview",
  },
  {
    id: "2",
    title: "Technical Interview - InnovateSoft",
    date: "2023-11-17",
    type: "interview",
  },
  {
    id: "3",
    title: "Follow-up Deadline - WebSolutions",
    date: "2023-11-20",
    type: "deadline",
  },
  {
    id: "4",
    title: "Application Deadline - Acme Inc",
    date: "2023-11-25",
    type: "deadline",
  },
  {
    id: "5",
    title: "Final Interview - Massive Dynamic",
    date: "2023-11-28",
    type: "interview",
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])

  // Get the date from URL query parameters
  const searchParams = useSearchParams()

  // Set the current date based on the URL parameter when component mounts
  useEffect(() => {
    const dateParam = searchParams?.get("date")
    if (dateParam) {
      try {
        // Parse the date parameter (assuming format YYYY-MM-DD)
        const parsedDate = parse(dateParam, "yyyy-MM-dd", new Date())

        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
          setCurrentDate(parsedDate)
          setSelectedDate(parsedDate)

          // Find events for this date
          const dayEvents = events.filter((event) => isSameDay(new Date(event.date), parsedDate))
          setSelectedEvents(dayEvents)
        }
      } catch (error) {
        console.error("Error parsing date parameter:", error)
      }
    }
  }, [searchParams])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day))
    setSelectedEvents(dayEvents)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center font-medium">
          <div className="p-2">Sun</div>
          <div className="p-2">Mon</div>
          <div className="p-2">Tue</div>
          <div className="p-2">Wed</div>
          <div className="p-2">Thu</div>
          <div className="p-2">Fri</div>
          <div className="p-2">Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: new Date(monthStart).getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2 h-24 border rounded-md bg-muted/20"></div>
          ))}
          {monthDays.map((day) => {
            const dayEvents = getEventsForDate(day)
            const hasEvents = dayEvents.length > 0
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <Dialog key={day.toString()}>
                <DialogTrigger asChild>
                  <div
                    className={`p-2 h-24 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                      isSameDay(day, new Date()) ? "bg-primary/10 border-primary" : ""
                    } ${isSelected ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className="font-medium">{format(day, "d")}</div>
                    {hasEvents && (
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs truncate rounded px-1 py-0.5 ${
                              event.type === "interview"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{format(day, "EEEE, MMMM d, yyyy")}</DialogTitle>
                    <DialogDescription>Events for this day</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {dayEvents.length > 0 ? (
                      dayEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{event.title}</p>
                          </div>
                          <Badge variant="outline">{event.type === "interview" ? "Interview" : "Deadline"}</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">No events for this day</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

