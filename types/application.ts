export type ApplicationStatus =
  | "Applied"
  | "Phone Screen"
  | "Technical Interview"
  | "Onsite Interview"
  | "Offer"
  | "Rejected"
  | "Accepted"
  | "Declined"

export interface Application {
  id: string
  company: string
  position: string
  location?: string
  jobType?: string
  status: ApplicationStatus
  url?: string
  salary?: string
  dateApplied: string
  description?: string
  notes?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
}

export interface ApplicationEvent {
  id: string
  applicationId: string
  date: string
  type: string
  notes?: string
}

export interface ApplicationNote {
  id: string
  applicationId: string
  date: string
  title: string
  content: string
}

