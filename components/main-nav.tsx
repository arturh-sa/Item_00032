"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {BriefcaseBusiness, Menu} from "lucide-react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"

export function MainNav() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const routes = [
        {href: "/applications", label: "Applications"},
        {href: "/calendar", label: "Calendar"},
    ]

    return (
        <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <BriefcaseBusiness className="h-6 w-6"/>
                <span className="hidden font-bold sm:inline-block">JobTrackr</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === route.href || pathname?.startsWith(route.href + "/")
                                ? "text-foreground"
                                : "text-foreground/60",
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                        <div className="flex flex-col space-y-6 py-4">
                            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                <BriefcaseBusiness className="h-6 w-6"/>
                                <span className="font-bold">JobTrackr</span>
                            </Link>
                            <nav className="flex flex-col space-y-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-foreground/80",
                                            pathname === route.href || pathname?.startsWith(route.href + "/")
                                                ? "text-foreground"
                                                : "text-foreground/60",
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

