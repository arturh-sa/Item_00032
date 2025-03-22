"use client"

import {useState, useEffect, useCallback, useMemo} from "react"
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    addMonths,
    subMonths,
    parse,
    setMonth,
    setYear,
    getYear,
    getMonth,
    addYears,
    subYears,
} from "date-fns"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ChevronLeft, ChevronRight, Code, Users, CheckCircle, Phone, CalendarIcon} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {useSearchParams} from "next/navigation"
import {statusVariantMap} from "@/lib/utils"
import {upcomingInterviews} from "@/components/upcoming-interviews"

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
    date: "2025-03-25",
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
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)
    const [isYearPickerOpen, setIsYearPickerOpen] = useState(false)

    // Generate years array for the picker (current year ± 5 years)
    const currentYear = getYear(new Date())
    const years = useMemo(() => {
        return Array.from({length: 11}, (_, i) => (currentYear - 5 + i).toString())
    }, [currentYear])

    // Generate months array for the picker
    const months = useMemo(() => {
        return Array.from({length: 12}, (_, i) => ({
            value: i.toString(),
            label: format(new Date(2000, i, 1), "MMMM"),
        }))
    }, [])

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
    const monthDays = eachDayOfInterval({start: monthStart, end: monthEnd})

    // Navigation functions
    const previousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1))
    }

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1))
    }

    const previousYear = () => {
        setCurrentDate(subYears(currentDate, 1))
    }

    const nextYear = () => {
        setCurrentDate(addYears(currentDate, 1))
    }

    // Handle month change
    const handleMonthChange = (value: string) => {
        const newDate = setMonth(currentDate, Number.parseInt(value))
        setCurrentDate(newDate)
        setIsMonthPickerOpen(false)
    }

    // Handle year change
    const handleYearChange = (value: string) => {
        const newDate = setYear(currentDate, Number.parseInt(value))
        setCurrentDate(newDate)
        setIsYearPickerOpen(false)
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
                return <Code className="mr-1 h-3 w-3"/>
            case "HR":
                return <Users className="mr-1 h-3 w-3"/>
            case "Final":
                return <CheckCircle className="mr-1 h-3 w-3"/>
            case "Phone Screen":
                return <Phone className="mr-1 h-3 w-3"/>
            default:
                return null
        }
    }

    // Get current month and year display
    const currentMonthName = format(currentDate, "MMMM")
    const currentYearValue = format(currentDate, "yyyy")

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground"/>
                    <span className="text-lg font-medium">{format(currentDate, "MMMM yyyy")}</span>
                </div>
                <div className="flex items-center border rounded-md overflow-hidden">
                    {/* Month Navigation */}
                    <Button variant="ghost" size="sm" onClick={previousMonth}
                            className="px-2 rounded-none border-r h-9 w-9">
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>

                    <Popover open={isMonthPickerOpen} onOpenChange={setIsMonthPickerOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm"
                                    className="px-3 rounded-none border-r h-9 w-24 font-medium">
                                {currentMonthName}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                            <div className="grid grid-cols-3 gap-1 p-2">
                                {months.map((month) => (
                                    <Button
                                        key={month.value}
                                        variant={Number.parseInt(month.value) === getMonth(currentDate) ? "default" : "ghost"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleMonthChange(month.value)}
                                    >
                                        {isMobile ? month.label.substring(0, 3) : month.label}
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="sm" onClick={nextMonth}
                            className="px-2 rounded-none border-r h-9 w-9">
                        <ChevronRight className="h-4 w-4"/>
                    </Button>

                    {/* Year Navigation */}
                    <Button variant="ghost" size="sm" onClick={previousYear}
                            className="px-2 rounded-none border-r h-9 w-9">
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>

                    <Popover open={isYearPickerOpen} onOpenChange={setIsYearPickerOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm"
                                    className="px-3 rounded-none border-r h-9 w-16 font-medium">
                                {currentYearValue}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                            <div className="grid grid-cols-3 gap-1 p-2 max-h-[200px] overflow-y-auto">
                                {years.map((year) => (
                                    <Button
                                        key={year}
                                        variant={Number.parseInt(year) === getYear(currentDate) ? "default" : "ghost"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => handleYearChange(year)}
                                    >
                                        {year}
                                    </Button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Button variant="ghost" size="sm" onClick={nextYear} className="px-2 rounded-none h-9 w-9">
                        <ChevronRight className="h-4 w-4"/>
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
                    {Array.from({length: new Date(monthStart).getDay()}).map((_, index) => (
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

                                                    return isMobile ? (
                                                        <div
                                                            key={event.id}
                                                            className={`h-2 w-2 rounded-full mx-auto bg-${variant}-500`}
                                                            style={{
                                                                backgroundColor:
                                                                    variant === "applied"
                                                                        ? "rgb(59, 130, 246)"
                                                                        : // blue
                                                                        variant === "phoneScreen"
                                                                            ? "rgb(139, 92, 246)"
                                                                            : // purple
                                                                            variant === "interview"
                                                                                ? "rgb(16, 185, 129)"
                                                                                : // green
                                                                                variant === "offer"
                                                                                    ? "rgb(245, 158, 11)"
                                                                                    : // amber
                                                                                    variant === "rejected"
                                                                                        ? "rgb(239, 68, 68)"
                                                                                        : // red
                                                                                        "rgb(156, 163, 175)", // gray (default)
                                                            }}
                                                        />
                                                    ) : (
                                                        <Badge
                                                            key={event.id}
                                                            variant={variant as any}
                                                            className="flex items-center text-xs w-full justify-center"
                                                        >
                                                            {getEventTypeIcon(event.type)}
                                                            {event.type + " - " + event.company}
                                                        </Badge>
                                                    )
                                                })}
                                                {dayEvents.length > (isMobile ? 1 : 2) && (
                                                    <div className="text-xs text-muted-foreground text-center">
                                                        +{dayEvents.length - (isMobile ? 1 : 2)} more
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] max-w-[90vw]">
                                    <DialogHeader>
                                        <DialogTitle>{format(day, "EEEE, MMMM d, yyyy")}</DialogTitle>
                                        <DialogDescription>Events for this day</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 mt-4 max-w-full overflow-hidden">
                                        {dayEvents.length > 0 ? (
                                            dayEvents.map((event) => (
                                                <div key={event.id}
                                                     className="flex flex-wrap items-center justify-between border-b pb-2">
                                                    <div className="max-w-[70%]">
                                                        <p className="font-medium truncate">{event.company}</p>
                                                        <p className="text-sm text-muted-foreground truncate">{event.position}</p>
                                                        {event.time && (
                                                            <p className="text-xs text-muted-foreground mt-1 truncate">Time: {event.time}</p>
                                                        )}
                                                    </div>
                                                    <Badge
                                                        variant={statusVariantMap[event.type]?.toLowerCase() as any}
                                                        className="flex items-center mt-1 md:mt-0"
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

