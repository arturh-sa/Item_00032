import type * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                destructive: "border-transparent bg-destructive text-destructive-foreground",
                outline: "text-foreground",

                // Application status variants
                applied: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
                phoneScreen:
                    "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-600 dark:bg-purple-950 dark:text-purple-300",
                interview:
                    "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300",
                offer:
                    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",
                rejected: "border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-950 dark:text-red-300",
                accepted:
                    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
                declined:
                    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-950 dark:text-orange-300",

                // Interview type variants
                technical:
                    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
                hr: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-600 dark:bg-sky-950 dark:text-sky-300",
                final:
                    "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-600 dark:bg-violet-950 dark:text-violet-300",

                // Status variants
                upcoming: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
                completed:
                    "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300",

                // Calendar event variants
                deadline:
                    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}

function Badge({className, variant, ...props}: BadgeProps) {
    return <div className={cn(badgeVariants({variant}), className)} {...props} />
}

export {Badge, badgeVariants}

