"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react"
import {ApplicationTimelineEvent} from "@/components/application-timeline-event"
import {ApplicationTimelineForm} from "@/components/application-timeline-form"
import {format} from "date-fns"

type ApplicationTimelineProps = {}

// Update the timelineEvents array by changing all dates from 2023-10-xx to 2025-02-xx and 2023-11-xx to 2025-03-xx

// Mock data for demonstration
const timelineEvents = [
    {
        id: "1",
        date: "2025-03-10",
        type: "Applied",
        notes: "Submitted application through company website.",
    },
    {
        id: "2",
        date: "2025-03-15",
        type: "Phone Screen",
        notes: "30-minute call with HR. Discussed background and experience.",
    },
    {
        id: "3",
        date: "2025-03-20",
        type: "Technical Interview",
        notes: "1-hour technical interview with the engineering team. Covered React, Next.js, and system design.",
    },
]

export function ApplicationTimeline() {
    const [events, setEvents] = useState(timelineEvents)
    const [showForm, setShowForm] = useState(false)

    const addEvent = (event: any) => {
        const newEvent = {
            id: Date.now().toString(),
            date: event.date ? format(event.date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
            type: event.type,
            notes: event.notes || "",
        }
        setEvents([...events, newEvent])
        setShowForm(false)
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">Application Timeline</CardTitle>
                    <Button size="sm" onClick={() => setShowForm(!showForm)}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Event
                    </Button>
                </CardHeader>
                <CardContent>
                    {showForm && (
                        <div className="mb-6">
                            <ApplicationTimelineForm onSubmit={addEvent} onCancel={() => setShowForm(false)}/>
                        </div>
                    )}
                    <div className="space-y-4">
                        {events.map((event) => (
                            <ApplicationTimelineEvent key={event.id} event={event}/>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

