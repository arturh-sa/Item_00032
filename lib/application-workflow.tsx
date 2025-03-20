import type { ApplicationStatus } from "@/types/application"

export const applicationWorkflow = {
  nodes: [
    { id: "applied", label: "Applied", type: "input" },
    { id: "phone_screen", label: "Phone Screen" },
    { id: "technical", label: "Technical Interview" },
    { id: "onsite", label: "Onsite Interview" },
    { id: "offer", label: "Offer", type: "output" },
    { id: "rejected", label: "Rejected", type: "output" },
  ],
  edges: [
    { id: "e1-2", source: "applied", target: "phone_screen" },
    { id: "e2-3", source: "phone_screen", target: "technical" },
    { id: "e3-4", source: "technical", target: "onsite" },
    { id: "e4-5", source: "onsite", target: "offer" },
    { id: "e1-6", source: "applied", target: "rejected" },
    { id: "e2-6", source: "phone_screen", target: "rejected" },
    { id: "e3-6", source: "technical", target: "rejected" },
    { id: "e4-6", source: "onsite", target: "rejected" },
  ],
}

export function getNextPossibleStatuses(currentStatus: ApplicationStatus): ApplicationStatus[] {
  switch (currentStatus) {
    case "Applied":
      return ["Phone Screen", "Rejected"]
    case "Phone Screen":
      return ["Technical Interview", "Rejected"]
    case "Technical Interview":
      return ["Onsite Interview", "Rejected"]
    case "Onsite Interview":
      return ["Offer", "Rejected"]
    case "Offer":
      return ["Accepted", "Declined"]
    case "Rejected":
    case "Accepted":
    case "Declined":
      return []
    default:
      return []
  }
}

