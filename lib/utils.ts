import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Map status names to badge variant names
export const statusVariantMap: Record<string, string> = {
  // Application statuses
  Applied: "applied",
  "Phone Screen": "phoneScreen",
  Interview: "interview",
  "Technical Interview": "interview",
  "Onsite Interview": "interview",
  Offer: "offer",
  Rejected: "rejected",
  Accepted: "accepted",
  Declined: "declined",

  // Interview types
  Technical: "technical",
  HR: "hr",
  Final: "final",
  Phone: "phoneScreen",

  // Status types
  Upcoming: "upcoming",
  Completed: "completed",

  // Calendar event types
  deadline: "deadline",
  interview: "interview",
}

// Keep the original statusColorMap for backward compatibility
export const statusColorMap: Record<string, string> = {
  // Application statuses
  Applied: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
  "Phone Screen":
    "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-600 dark:bg-purple-950 dark:text-purple-300",
  Interview: "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300",
  Offer: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",
  Rejected: "border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-950 dark:text-red-300",
  Accepted:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
  Declined:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-950 dark:text-orange-300",

  // Interview types
  Technical:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
  HR: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-600 dark:bg-sky-950 dark:text-sky-300",
  Final:
    "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-600 dark:bg-violet-950 dark:text-violet-300",
  Phone:
    "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-600 dark:bg-purple-950 dark:text-purple-300",

  // Timeline event types
  "Technical Interview":
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
  "Onsite Interview":
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",

  // Status types
  Upcoming: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
  Completed: "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300",

  // Calendar event types
  deadline: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",
  interview: "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300",
}

// Interview type to icon mapping
export const interviewTypeIcons: Record<string, string> = {
  Technical: "code",
  HR: "users",
  Final: "check-circle",
  Phone: "phone",
  "Phone Screen": "phone",
}

