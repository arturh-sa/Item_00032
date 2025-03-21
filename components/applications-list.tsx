"use client"

import {useState} from "react"
import Link from "next/link"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react"
import {useFilter} from "@/contexts/filter-context"
import {useApplications} from "@/contexts/applications-context"
import {statusVariantMap} from "@/lib/utils"
import {Card, CardContent} from "@/components/ui/card"

export function ApplicationsList() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null)
    const {statusFilter, locationFilter, searchTerm} = useFilter()
    const {applications, deleteApplication} = useApplications()

    // Function to handle application deletion
    const handleDelete = (id: string) => {
        setApplicationToDelete(id)
        setDeleteDialogOpen(true)
    }

    // Function to confirm deletion
    const confirmDelete = () => {
        if (applicationToDelete) {
            deleteApplication(applicationToDelete)
            setApplicationToDelete(null)
            setDeleteDialogOpen(false)
        }
    }

    // Filter applications based on selected filters
    const filteredApplications = applications.filter((application) => {
        // Status filter
        if (statusFilter !== "all" && application.status !== statusFilter) {
            return false
        }

        // Location filter
        if (locationFilter !== "all" && application.location) {
            const locationMatch = application.location.toLowerCase().includes(locationFilter.toLowerCase())
            if (!locationMatch) return false
        }

        // Search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase()
            return (
                application.company.toLowerCase().includes(searchLower) ||
                application.position.toLowerCase().includes(searchLower) ||
                (application.location && application.location.toLowerCase().includes(searchLower))
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
        <>
            {/* Desktop Table View */}
            <div className="rounded-md border hidden md:block">
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
                                    <Badge variant={statusVariantMap[application.status] as any}
                                           className="pointer-events-none">
                                        {application.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{application.location}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/applications/${application.id}`}>
                                                    <Eye className="mr-2 h-4 w-4"/>
                                                    View
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/applications/${application.id}/edit`}>
                                                    <Pencil className="mr-2 h-4 w-4"/>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                className="text-red-600 cursor-pointer"
                                                onClick={() => handleDelete(application.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4"/>
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

            {/* Mobile Card View */}
            <div className="space-y-4 md:hidden">
                {filteredApplications.map((application) => (
                    <Card key={application.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium">{application.company}</h3>
                                    <p className="text-sm text-muted-foreground">{application.position}</p>
                                </div>
                                <Badge variant={statusVariantMap[application.status] as any}
                                       className="pointer-events-none">
                                    {application.status}
                                </Badge>
                            </div>
                            <div className="text-sm space-y-1 mb-3">
                                <p>Applied: {application.dateApplied}</p>
                                <p>Location: {application.location || "Not specified"}</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/applications/${application.id}`}>
                                        <Eye className="mr-1 h-4 w-4"/>
                                        View
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/applications/${application.id}/edit`}>
                                        <Pencil className="mr-1 h-4 w-4"/>
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(application.id)}
                                >
                                    <Trash2 className="mr-1 h-4 w-4"/>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the application and remove it
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

