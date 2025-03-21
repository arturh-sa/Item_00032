import type React from "react"
import "@/app/globals.css"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import {SiteHeader} from "@/components/site-header"
import {SiteFooter} from "@/components/site-footer"
import {Toaster} from "@/components/ui/toaster"
import {ToastContextProvider} from "@/components/ui/use-toast"
import {ApplicationsProvider} from "@/contexts/applications-context"

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        </head>
        <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="job-trackr-theme">
            <ToastContextProvider>
                <ApplicationsProvider>
                    <div className="relative flex min-h-screen flex-col">
                        <SiteHeader/>
                        <div className="flex-1 w-full">{children}</div>
                        <SiteFooter/>
                        <Toaster/>
                    </div>
                </ApplicationsProvider>
            </ToastContextProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}


import './globals.css'

export const metadata = {
    generator: 'v0.dev'
};
