"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FilterContextType {
  statusFilter: string
  setStatusFilter: (status: string) => void
  locationFilter: string
  setLocationFilter: (location: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <FilterContext.Provider
      value={{
        statusFilter,
        setStatusFilter,
        locationFilter,
        setLocationFilter,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}

