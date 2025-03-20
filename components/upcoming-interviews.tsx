import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Building2, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"

export function UpcomingInterviews() {
  const interviews = [
    {
      id: "1",
      company: "TechCorp",
      position: "Frontend Developer",
      date: "2023-11-15",
      time: "10:00 AM",
      type: "Technical",
      location: "Remote (Zoom)",
      interviewer: "Alex Johnson",
      description:
        "Technical interview focusing on React, Next.js, and frontend architecture. Prepare to discuss past projects and problem-solving approaches.",
    },
    {
      id: "2",
      company: "InnovateSoft",
      position: "React Developer",
      date: "2023-11-17",
      time: "2:30 PM",
      type: "HR",
      location: "Phone Call",
      interviewer: "Sarah Miller",
      description:
        "Initial HR screening to discuss your background, experience, and fit for the role. Be prepared to talk about your career goals.",
    },
    {
      id: "3",
      company: "WebSolutions",
      position: "UI Engineer",
      date: "2023-11-20",
      time: "11:15 AM",
      type: "Final",
      location: "On-site (123 Tech Street, San Francisco)",
      interviewer: "Michael Chen",
      description:
        "Final round interview with the engineering team and CTO. Will include a system design discussion and cultural fit assessment.",
    },
  ]

  // Function to format date for URL parameter
  const formatDateForUrl = (dateString: string) => {
    // Assuming dateString is in format "YYYY-MM-DD"
    return dateString
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
        <CardDescription>Your scheduled interviews for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Dialog key={interview.id}>
              <DialogTrigger asChild>
                <div className="flex items-start space-x-4 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{interview.company}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <div className="flex items-center pt-2">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{interview.date}</span>
                      <Clock className="ml-3 mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{interview.time}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{interview.type}</Badge>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">{interview.company} Interview</DialogTitle>
                  <DialogDescription>Details for your upcoming interview</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{interview.company}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">
                        {interview.date} at {interview.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{interview.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Interviewer</p>
                      <p className="text-sm text-muted-foreground">{interview.interviewer}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">{interview.description}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button asChild>
                    <Link href={`/calendar?date=${formatDateForUrl(interview.date)}`}>View in Calendar</Link>
                  </Button>
                  <Button>Prepare Notes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

