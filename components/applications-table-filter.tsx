"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useFilter } from "@/contexts/filter-context"

export function ApplicationsTableFilter() {
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, locationFilter, setLocationFilter } = useFilter()

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setLocationFilter("all")
  }

  const hasActiveFilters = searchTerm || statusFilter !== "all" || locationFilter !== "all"

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 py-4">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="w-full sm:w-[300px] pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-9" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
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
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="On-site">On-site</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

