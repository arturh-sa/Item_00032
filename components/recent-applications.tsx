import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {CalendarDays, Building2, Briefcase, MapPin} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {statusVariantMap} from "@/lib/utils"
import {cn} from "@/lib/utils"

interface RecentApplicationsProps {
    className?: string
}

export function RecentApplications({className}: RecentApplicationsProps) {
    const applications = [
        {
            id: "1",
            company: "Acme Inc",
            position: "Senior Frontend Developer",
            date: "2025-03-10",
            status: "Applied",
            location: "Remote",
            jobType: "Full-time",
            description:
                "Senior Frontend Developer position focusing on React and Next.js development for enterprise applications.",
            url: "https://acme.com/careers/senior-frontend",
        },
        {
            id: "2",
            company: "Globex Corp",
            position: "React Developer",
            date: "2025-03-08",
            status: "Applied",
            location: "New York, NY",
            jobType: "Full-time",
            description:
                "Building modern web applications using React, Redux, and related technologies for a financial services platform.",
            url: "https://globex.com/jobs/react-developer",
        },
        {
            id: "3",
            company: "Initech",
            position: "UI/UX Developer",
            date: "2025-03-05",
            status: "Phone Screen",
            location: "San Francisco, CA",
            jobType: "Contract",
            description:
                "Developing user interfaces and experiences for a suite of enterprise software products. Requires strong design skills.",
            url: "https://initech.com/careers/ui-ux-developer",
        },
    ]

    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your most recent job applications</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {applications.map((application) => (
                        <Dialog key={application.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="flex items-start space-x-4 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                    <div className="flex-1 space-y-1">
                                        <p className="font-medium leading-none">{application.company}</p>
                                        <p className="text-sm text-muted-foreground">{application.position}</p>
                                        <div className="flex items-center pt-2">
                                            <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">{application.date}</span>
                                        </div>
                                    </div>
                                    <Badge variant={(statusVariantMap[application.status] as any) || "default"}>
                                        {application.status}
                                    </Badge>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl">{application.company}</DialogTitle>
                                    <DialogDescription>{application.position}</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                        <div>
                                            <p className="font-medium">Company</p>
                                            <p className="text-sm text-muted-foreground">{application.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                        <div>
                                            <p className="font-medium">Job Type</p>
                                            <p className="text-sm text-muted-foreground">{application.jobType}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-sm text-muted-foreground">{application.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5"/>
                                        <div>
                                            <p className="font-medium">Applied On</p>
                                            <p className="text-sm text-muted-foreground">{application.date}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="font-medium">Description</p>
                                        <p className="text-sm text-muted-foreground">{application.description}</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

