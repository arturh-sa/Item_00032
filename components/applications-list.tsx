"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Pencil, Trash2, ExternalLink } from "lucide-react"
import { useFilter } from "@/contexts/filter-context"

// Mock data for demonstration
const applications = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Senior Frontend Developer",
    dateApplied: "2023-11-10",
    status: "Applied",
    location: "Remote",
    url: "https://acme.com/careers",
  },
  {
    id: "2",
    company: "Globex Corp",
    position: "React Developer",
    dateApplied: "2023-11-08",
    status: "Applied",
    location: "New York, NY",
    url: "https://globex.com/jobs",
  },
  {
    id: "3",
    company: "Initech",
    position: "UI/UX Developer",
    dateApplied: "2023-11-05",
    status: "Phone Screen",
    location: "San Francisco, CA",
    url: "https://initech.com/careers",
  },
  {
    id: "4",
    company: "Massive Dynamic",
    position: "Full Stack Developer",
    dateApplied: "2023-11-01",
    status: "Interview",
    location: "Boston, MA",
    url: "https://massivedynamic.com/jobs",
  },
  {
    id: "5",
    company: "Cyberdyne Systems",
    position: "Frontend Engineer",
    dateApplied: "2023-10-28",
    status: "Rejected",
    location: "Austin, TX",
    url: "https://cyberdyne.com/careers",
  },
  {
    id: "6",
    company: "Stark Industries",
    position: "React Native Developer",
    dateApplied: "2023-10-25",
    status: "Offer",
    location: "Remote",
    url: "https://stark.com/jobs",
  },
]

const statusColorMap: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Phone Screen": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Offer: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function ApplicationsList() {
  const { statusFilter, locationFilter, searchTerm } = useFilter()

  // Filter applications based on selected filters
  const filteredApplications = applications.filter((application) => {
    // Status filter
    if (statusFilter !== "all" && application.status !== statusFilter) {
      return false
    }

    // Location filter
    if (locationFilter !== "all") {
      const locationMatch = application.location.toLowerCase().includes(locationFilter.toLowerCase())
      if (!locationMatch) return false
    }

    // Search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        application.company.toLowerCase().includes(searchLower) ||
        application.position.toLowerCase().includes(searchLower) ||
        application.location.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  if (filteredApplications.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <h3 className="text-lg font-medium">No applications found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or search term to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>{application.dateApplied}</TableCell>
              <TableCell>
                <Badge className={statusColorMap[application.status]}>{application.status}</Badge>
              </TableCell>
              <TableCell>{application.location}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/applications/${application.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/applications/${application.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={application.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Job Posting
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

