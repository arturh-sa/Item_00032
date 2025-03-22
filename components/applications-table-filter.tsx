"use client"

import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Button} from "@/components/ui/button"
import {Search, X, Filter} from "lucide-react"
import {useFilter} from "@/contexts/filter-context"
import {useState} from "react"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

export function ApplicationsTableFilter() {
    const {searchTerm, setSearchTerm, statusFilter, setStatusFilter, locationFilter, setLocationFilter} = useFilter()
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const clearFilters = () => {
        setSearchTerm("")
        setStatusFilter("all")
        setLocationFilter("all")
        setIsFilterOpen(false)
    }

    const hasActiveFilters = searchTerm || statusFilter !== "all" || locationFilter !== "all"

    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 py-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 w-full">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search applications..."
                        className="pl-8 pr-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4"/>
                        </button>
                    )}
                </div>

                {/* Desktop Filters */}
                <div className="hidden sm:flex space-x-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Applied">Applied</SelectItem>
                            <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                            <SelectItem value="Interview">Interview</SelectItem>
                            <SelectItem value="Offer">Offer</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Location"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" className="h-9" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </div>

                {/* Mobile Filters */}
                <div className="sm:hidden">
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                                <Filter className="mr-2 h-4 w-4"/>
                                Filters
                                {hasActiveFilters && <span className="ml-1 rounded-full bg-primary w-2 h-2"></span>}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[50vh]">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="Applied">Applied</SelectItem>
                                            <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                                            <SelectItem value="Interview">Interview</SelectItem>
                                            <SelectItem value="Offer">Offer</SelectItem>
                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Location"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Locations</SelectItem>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                            <SelectItem value="On-site">On-site</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear
                                    </Button>
                                    <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

