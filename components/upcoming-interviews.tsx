"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Calendar, Clock, MapPin, Building2, User, Code, Users, CheckCircle, Phone} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {ApplicationNoteForm} from "@/components/application-note-form"
import {useToast} from "@/components/ui/use-toast"
import {statusVariantMap} from "@/lib/utils"
import {cn} from "@/lib/utils"

// Shared mock data for consistency across components
export const upcomingInterviews = [
    {
        id: "1",
        company: "TechCorp",
        position: "Frontend Developer",
        date: "2025-03-15",
        time: "10:00 AM",
        type: "Technical",
        location: "Remote (Zoom)",
        interviewer: "Alex Johnson",
        description:
            "Technical interview focusing on React, Next.js, and frontend architecture. Prepare to discuss past projects and problem-solving approaches.",
        notes: "",
        status: "Upcoming",
    },
    {
        id: "2",
        company: "InnovateSoft",
        position: "React Developer",
        date: "2025-03-17",
        time: "2:30 PM",
        type: "HR",
        location: "Phone Call",
        interviewer: "Sarah Miller",
        description:
            "Initial HR screening to discuss your background, experience, and fit for the role. Be prepared to talk about your career goals.",
        notes: "",
        status: "Upcoming",
    },
    {
        id: "3",
        company: "WebSolutions",
        position: "UI Engineer",
        date: "2025-03-20",
        time: "11:15 AM",
        type: "Final",
        location: "On-site (123 Tech Street, San Francisco)",
        interviewer: "Michael Chen",
        description:
            "Final round interview with the engineering team and CTO. Will include a system design discussion and cultural fit assessment.",
        notes: "",
        status: "Upcoming",
    },
    {
        id: "4",
        company: "Massive Dynamic",
        position: "Full Stack Developer",
        date: "2025-03-01",
        time: "11:00 AM",
        type: "Technical",
        location: "Remote (Google Meet)",
        interviewer: "David Wilson",
        description:
            "Technical interview with the engineering team. Focus on full-stack development, system design, and problem-solving.",
        notes: "",
        status: "Completed",
    },
    {
        id: "5",
        company: "Initech",
        position: "UI/UX Developer",
        date: "2025-02-28",
        time: "3:00 PM",
        type: "Phone Screen",
        location: "Phone Call",
        interviewer: "Jennifer Lee",
        description: "Initial phone screening to discuss your experience with UI/UX design and development.",
        notes: "",
        status: "Completed",
    },
]

interface UpcomingInterviewsProps {
    className?: string
}

export function UpcomingInterviews({className}: UpcomingInterviewsProps) {
    const [interviews, setInterviews] = useState(upcomingInterviews.filter((i) => i.status === "Upcoming"))
    const [selectedInterview, setSelectedInterview] = useState<string | null>(null)
    const [showNotesForm, setShowNotesForm] = useState(false)
    const [interviewDialogOpen, setInterviewDialogOpen] = useState(false)
    const {toast} = useToast()

    // Function to handle prepare notes button click
    const handlePrepareNotes = (interviewId: string) => {
        setSelectedInterview(interviewId)
        setShowNotesForm(true)
    }

    // Function to save notes
    const saveNotes = (data: { title: string; content: string }) => {
        if (selectedInterview) {
            setInterviews(
                interviews.map((interview) =>
                    interview.id === selectedInterview ? {
                        ...interview,
                        notes: `${data.title}: ${data.content}`
                    } : interview,
                ),
            )

            toast({
                title: "Notes saved",
                description: "Your interview preparation notes have been saved.",
            })

            setShowNotesForm(false)
        }
    }

    // Get the selected interview
    const getSelectedInterview = () => {
        return interviews.find((interview) => interview.id === selectedInterview)
    }

    // Function to get the appropriate icon for interview type
    const getInterviewTypeIcon = (type: string) => {
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

    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {interviews.map((interview) => (
                        <div key={interview.id}>
                            <div
                                className="flex items-start space-x-4 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => {
                                    setSelectedInterview(interview.id)
                                    setInterviewDialogOpen(true)
                                }}
                            >
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-none">{interview.company}</p>
                                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                                    <div className="flex items-center pt-2">
                                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground"/>
                                        <span className="text-xs text-muted-foreground">{interview.date}</span>
                                        <Clock className="ml-3 mr-1 h-4 w-4 text-muted-foreground"/>
                                        <span className="text-xs text-muted-foreground">{interview.time}</span>
                                    </div>
                                </div>
                                <Badge variant={statusVariantMap[interview.type]?.toLowerCase() as any}
                                       className="flex items-center">
                                    {getInterviewTypeIcon(interview.type)}
                                    {interview.type}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Interview Detail Dialog */}
            <Dialog open={interviewDialogOpen} onOpenChange={setInterviewDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    {selectedInterview && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl">
                                    {interviews.find((i) => i.id === selectedInterview)?.company} Interview
                                </DialogTitle>
                                <DialogDescription>Details for your upcoming interview</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-start gap-3">
                                    <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                    <div>
                                        <p className="font-medium">{interviews.find((i) => i.id === selectedInterview)?.company}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {interviews.find((i) => i.id === selectedInterview)?.position}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                    <div>
                                        <p className="font-medium">Date & Time</p>
                                        <p className="text-sm text-muted-foreground">
                                            {interviews.find((i) => i.id === selectedInterview)?.date} at{" "}
                                            {interviews.find((i) => i.id === selectedInterview)?.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-sm text-muted-foreground">
                                            {interviews.find((i) => i.id === selectedInterview)?.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                    <div>
                                        <p className="font-medium">Interviewer</p>
                                        <p className="text-sm text-muted-foreground">
                                            {interviews.find((i) => i.id === selectedInterview)?.interviewer}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="font-medium">Description</p>
                                    <p className="text-sm text-muted-foreground">
                                        {interviews.find((i) => i.id === selectedInterview)?.description}
                                    </p>
                                </div>

                                {interviews.find((i) => i.id === selectedInterview)?.notes && (
                                    <div className="space-y-1.5 bg-muted p-3 rounded-md">
                                        <p className="font-medium">Your Notes</p>
                                        <p className="text-sm text-muted-foreground">
                                            {interviews.find((i) => i.id === selectedInterview)?.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={() => {
                                        setShowNotesForm(true)
                                        setInterviewDialogOpen(false)
                                    }}
                                >
                                    {interviews.find((i) => i.id === selectedInterview)?.notes ? "Edit Notes" : "Prepare Notes"}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Notes Form Dialog */}
            <Dialog open={showNotesForm} onOpenChange={setShowNotesForm}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Prepare Interview Notes</DialogTitle>
                        <DialogDescription>
                            {getSelectedInterview()?.company} - {getSelectedInterview()?.position} on {getSelectedInterview()?.date}
                        </DialogDescription>
                    </DialogHeader>
                    <ApplicationNoteForm
                        onSubmit={saveNotes}
                        onCancel={() => setShowNotesForm(false)}
                        defaultValues={{
                            title: "Interview Preparation",
                            content: getSelectedInterview()?.notes?.split(": ")[1] || "",
                        }}
                        submitLabel="Save Notes"
                    />
                </DialogContent>
            </Dialog>
        </Card>
    )
}

