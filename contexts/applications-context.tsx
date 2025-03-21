"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

// Define the Application type
export interface Application {
  id: string
  company: string
  position: string
  status: string
  dateApplied: string
  location?: string
  jobType?: string
  salary?: string
  description?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  url?: string
  notes?: string
}

// Update the initialApplications array by changing all dates from 2023-10-xx to 2025-02-xx and 2023-11-xx to 2025-03-xx

// Initial applications data
const initialApplications: Application[] = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Senior Frontend Developer",
    dateApplied: "2025-03-10",
    status: "Applied",
    location: "Remote",
    jobType: "full-time",
    salary: "$120,000 - $150,000",
    description: "Senior Frontend Developer position with focus on React and Next.js",
    url: "https://acme.com/careers",
  },
  {
    id: "2",
    company: "Globex Corp",
    position: "React Developer",
    dateApplied: "2025-03-08",
    status: "Applied",
    location: "New York, NY",
    jobType: "full-time",
    url: "https://globex.com/jobs",
  },
  {
    id: "3",
    company: "Initech",
    position: "UI/UX Developer",
    dateApplied: "2025-03-05",
    status: "Phone Screen",
    location: "San Francisco, CA",
    jobType: "contract",
    url: "https://initech.com/careers",
  },
  {
    id: "4",
    company: "Massive Dynamic",
    position: "Full Stack Developer",
    dateApplied: "2025-03-01",
    status: "Interview",
    location: "Boston, MA",
    jobType: "full-time",
    url: "https://massivedynamic.com/jobs",
  },
  {
    id: "5",
    company: "Cyberdyne Systems",
    position: "Frontend Engineer",
    dateApplied: "2025-02-28",
    status: "Rejected",
    location: "Austin, TX",
    jobType: "full-time",
    url: "https://cyberdyne.com/careers",
  },
  {
    id: "6",
    company: "Stark Industries",
    position: "React Native Developer",
    dateApplied: "2025-02-25",
    status: "Offer",
    location: "Remote",
    jobType: "full-time",
    url: "https://stark.com/jobs",
  },
]

// Define the context type
interface ApplicationsContextType {
  applications: Application[]
  getApplication: (id: string) => Application | undefined
  addApplication: (application: Omit<Application, "id">) => string
  updateApplication: (id: string, application: Partial<Application>) => void
  deleteApplication: (id: string) => void
}

// Create the context
const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined)

// Create a provider component
export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([])
  const { toast } = useToast()

  // Load applications from localStorage on initial render
  useEffect(() => {
    const savedApplications = localStorage.getItem("applications")
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications))
    } else {
      setApplications(initialApplications)
      localStorage.setItem("applications", JSON.stringify(initialApplications))
    }
  }, [])

  // Save applications to localStorage whenever they change
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem("applications", JSON.stringify(applications))
    }
  }, [applications])

  // Get a single application by ID
  const getApplication = (id: string) => {
    return applications.find((app) => app.id === id)
  }

  // Add a new application
  const addApplication = (application: Omit<Application, "id">) => {
    const id = Date.now().toString()
    const newApplication = { ...application, id }

    setApplications((prev) => [...prev, newApplication])

    toast({
      title: "Application added",
      description: "Your job application has been successfully added.",
    })

    return id
  }

  // Update an existing application
  const updateApplication = (id: string, updatedFields: Partial<Application>) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...updatedFields } : app)))

    toast({
      title: "Application updated",
      description: "Your job application has been successfully updated.",
    })
  }

  // Delete an application
  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))

    toast({
      title: "Application deleted",
      description: "Your job application has been successfully deleted.",
    })
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        getApplication,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  )
}

// Create a hook to use the applications context
export function useApplications() {
  const context = useContext(ApplicationsContext)

  if (context === undefined) {
    throw new Error("useApplications must be used within an ApplicationsProvider")
  }

  return context
}

