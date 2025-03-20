"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, Clock, CheckCircle2, ArrowUpRight, Download } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for demonstration
const allApplications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Senior Frontend Developer",
    dateApplied: "2023-11-10",
    status: "Applied",
    location: "Remote",
  },
  {
    id: "2",
    company: "Globex Corp",
    position: "React Developer",
    dateApplied: "2023-11-08",
    status: "Applied",
    location: "New York, NY",
  },
  {
    id: "3",
    company: "Initech",
    position: "UI/UX Developer",
    dateApplied: "2023-11-05",
    status: "Phone Screen",
    location: "San Francisco, CA",
  },
  {
    id: "4",
    company: "Massive Dynamic",
    position: "Full Stack Developer",
    dateApplied: "2023-11-01",
    status: "Interview",
    location: "Boston, MA",
  },
  {
    id: "5",
    company: "Cyberdyne Systems",
    position: "Frontend Engineer",
    dateApplied: "2023-10-28",
    status: "Rejected",
    location: "Austin, TX",
  },
  {
    id: "6",
    company: "Stark Industries",
    position: "React Native Developer",
    dateApplied: "2023-10-25",
    status: "Offer",
    location: "Remote",
  },
]

const activeApplications = allApplications.filter((app) =>
  ["Applied", "Phone Screen", "Interview"].includes(app.status),
)

const interviews = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    date: "2023-11-15",
    time: "10:00 AM",
    type: "Technical",
    status: "Upcoming",
  },
  {
    id: "2",
    company: "InnovateSoft",
    position: "React Developer",
    date: "2023-11-17",
    time: "2:30 PM",
    type: "HR",
    status: "Upcoming",
  },
  {
    id: "3",
    company: "Massive Dynamic",
    position: "Full Stack Developer",
    date: "2023-11-01",
    time: "11:00 AM",
    type: "Technical",
    status: "Completed",
  },
  {
    id: "4",
    company: "Initech",
    position: "UI/UX Developer",
    date: "2023-10-30",
    time: "3:00 PM",
    type: "Phone Screen",
    status: "Completed",
  },
  {
    id: "5",
    company: "WebSolutions",
    position: "UI Engineer",
    date: "2023-11-20",
    time: "11:15 AM",
    type: "Final",
    status: "Upcoming",
  },
]

const statusColorMap: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Phone Screen": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Offer: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

// Function to export data as CSV
const exportToCSV = (data: any[], filename: string) => {
  // Define the headers for the CSV
  const headers = Object.keys(data[0]).filter((key) => key !== "id")

  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(","),
    // Data rows
    ...data.map((row) =>
      headers
        .map((header) => {
          // Wrap values with commas in quotes
          const value = row[header]?.toString() || ""
          return value.includes(",") ? `"${value}"` : value
        })
        .join(","),
    ),
  ].join("\n")

  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a download link
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  // Add to document, click to download, and remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function StatsCards() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allApplications.length}</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>All Applications</DialogTitle>
            <DialogDescription>Overview of all your job applications</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-4">
              {allApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{app.company}</p>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{app.dateApplied}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColorMap[app.status]}>{app.status}</Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/applications/${app.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button asChild>
              <Link href="/applications">View All Applications</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeApplications.length}</div>
              <p className="text-xs text-muted-foreground">-2 from last month</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Active Applications</DialogTitle>
            <DialogDescription>Applications that are currently in progress</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="space-y-4">
              {activeApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{app.company}</p>
                    <p className="text-sm text-muted-foreground">{app.position}</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{app.dateApplied}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={statusColorMap[app.status]}>{app.status}</Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/applications/${app.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => exportToCSV(activeApplications, "active-applications.csv")}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export as CSV
            </Button>
            <Button asChild>
              <Link href="/applications?status=active">View Active Applications</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{interviews.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Interviews</DialogTitle>
            <DialogDescription>Your upcoming and past interviews</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Upcoming Interviews</h3>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                <div className="space-y-4">
                  {interviews
                    .filter((i) => i.status === "Upcoming")
                    .map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{interview.company}</p>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {interview.date} at {interview.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusColorMap[interview.type]}>{interview.type}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Past Interviews</h3>
              <ScrollArea className="h-[150px] rounded-md border p-4">
                <div className="space-y-4">
                  {interviews
                    .filter((i) => i.status === "Completed")
                    .map((interview) => (
                      <div key={interview.id} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium">{interview.company}</p>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {interview.date} at {interview.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusColorMap[interview.type]}>{interview.type}</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button asChild>
              <Link href="/calendar">View Calendar</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Application Success Rate</DialogTitle>
            <DialogDescription>Analysis of your job application outcomes</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Applications</h3>
                <p className="text-2xl font-bold">{allApplications.length}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Interviews</h3>
                <p className="text-2xl font-bold">{interviews.length}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Offers</h3>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Rejections</h3>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Success Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Application to Interview Rate</span>
                    <span className="text-sm font-medium">21%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "21%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Interview to Offer Rate</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Overall Success Rate</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Improvement Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Customize your resume for each application</li>
                <li>Follow up after interviews within 24-48 hours</li>
                <li>Practice common interview questions</li>
                <li>Research companies thoroughly before applying</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button>Generate Detailed Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

