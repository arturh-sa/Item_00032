"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parse } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Code, Users, CheckCircle, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation"
import { statusVariantMap } from "@/lib/utils"
import { upcomingInterviews } from "@/components/upcoming-interviews"

// Convert the shared interview data to calendar events
const events = upcomingInterviews.map((interview) => ({
  id: interview.id,
  title: `${interview.type} - ${interview.company}`,
  date: interview.date,
  type: interview.type,
  company: interview.company,
  position: interview.position,
  time: interview.time,
  status: interview.status,
  location: interview.location,
  interviewer: interview.interviewer,
  description: interview.description,
}))

// Add application deadlines for completeness
events.push({
  id: "app-1",
  title: "Application Deadline - Acme Inc",
  date: "2023-11-25",
  type: "Applied",
  company: "Acme Inc",
  position: "Senior Developer",
})

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])
  const [initialDateProcessed, setInitialDateProcessed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Get the date from URL query parameters
  const searchParams = useSearchParams()

  // Set the current date based on the URL parameter when component mounts
  useEffect(() => {
    // Only process the date parameter once to avoid infinite loops
    if (!initialDateProcessed) {
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
      setInitialDateProcessed(true)
    }
  }, [searchParams, initialDateProcessed])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  // Memoize the handleDateClick function to prevent unnecessary re-renders
  const handleDateClick = useCallback((day: Date) => {
    setSelectedDate(day)
    const dayEvents = events.filter((event) => isSameDay(new Date(event.date), day))
    setSelectedEvents(dayEvents)
  }, [])

  // Memoize the getEventsForDate function to prevent unnecessary re-renders
  const getEventsForDate = useCallback((date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date))
  }, [])

  // Memoize the days of the week to prevent unnecessary re-renders
  const daysOfWeek = useMemo(() => {
    return isMobile ? ["S", "M", "T", "W", "T", "F", "S"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }, [isMobile])

  // Function to get the appropriate icon for event type
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "Technical":
        return <Code className="mr-1 h-3 w-3" />
      case "HR":
        return <Users className="mr-1 h-3 w-3" />
      case "Final":
        return <CheckCircle className="mr-1 h-3 w-3" />
      case "Phone Screen":
        return <Phone className="mr-1 h-3 w-3" />
      default:
        return null
    }
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
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: new Date(monthStart).getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2 h-16 md:h-24 border rounded-md bg-muted/20"></div>
          ))}
          {monthDays.map((day) => {
            const dayEvents = getEventsForDate(day)
            const hasEvents = dayEvents.length > 0
            const isSelected = selectedDate && isSameDay(day, selectedDate)

            return (
              <Dialog key={day.toString()}>
                <DialogTrigger asChild>
                  <div
                    className={`p-2 h-16 md:h-24 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                      isSameDay(day, new Date()) ? "bg-primary/10 border-primary" : ""
                    } ${isSelected ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className="font-medium">{format(day, "d")}</div>
                    {hasEvents && (
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, isMobile ? 1 : 2).map((event) => {
                          // Get the correct variant for this event type
                          const variant = statusVariantMap[event.type]?.toLowerCase() || "default"

                          return (
                            <Badge
                              key={event.id}
                              variant={variant as any}
                              className="flex items-center text-xs w-full justify-center"
                            >
                              {getEventTypeIcon(event.type)}
                              {isMobile ? event.type : event.type + " - " + event.company}
                            </Badge>
                          )
                        })}
                        {dayEvents.length > (isMobile ? 1 : 2) && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - (isMobile ? 1 : 2)} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{format(day, "EEEE, MMMM d, yyyy")}</DialogTitle>
                    <DialogDescription>Events for this day</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {dayEvents.length > 0 ? (
                      dayEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{event.company}</p>
                            <p className="text-sm text-muted-foreground">{event.position}</p>
                            {event.time && <p className="text-xs text-muted-foreground mt-1">Time: {event.time}</p>}
                          </div>
                          <Badge
                            variant={statusVariantMap[event.type]?.toLowerCase() as any}
                            className="flex items-center"
                          >
                            {getEventTypeIcon(event.type)}
                            {event.type}
                          </Badge>
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

