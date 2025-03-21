"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor, RefreshCw } from "lucide-react"

export function ThemeDebugger() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [systemTheme, setSystemTheme] = useState<string>("unknown")
  const [localStorageTheme, setLocalStorageTheme] = useState<string>("unknown")
  const [documentTheme, setDocumentTheme] = useState<string>("unknown")
  const [browserInfo, setBrowserInfo] = useState<string>("unknown")

  useEffect(() => {
    // Get system theme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    // Get theme from localStorage
    try {
      const stored = localStorage.getItem("job-trackr-theme")
      setLocalStorageTheme(stored || "not set")
    } catch (e) {
      setLocalStorageTheme(`error: ${e}`)
    }

    // Get document class
    const docClasses = document.documentElement.classList
    setDocumentTheme(docClasses.contains("dark") ? "dark" : "light")

    // Get browser info
    setBrowserInfo(navigator.userAgent)

    // Set up listeners
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }

    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("job-trackr-theme")
        setLocalStorageTheme(stored || "not set")
      } catch (e) {
        setLocalStorageTheme(`error: ${e}`)
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const docClasses = document.documentElement.classList
          setDocumentTheme(docClasses.contains("dark") ? "dark" : "light")
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange)
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      observer.disconnect()
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleMediaChange)
      }
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const refreshState = () => {
    // Get system theme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setSystemTheme(mediaQuery.matches ? "dark" : "light")

    // Get theme from localStorage
    try {
      const stored = localStorage.getItem("job-trackr-theme")
      setLocalStorageTheme(stored || "not set")
    } catch (e) {
      setLocalStorageTheme(`error: ${e}`)
    }

    // Get document class
    const docClasses = document.documentElement.classList
    setDocumentTheme(docClasses.contains("dark") ? "dark" : "light")
  }

  const resetTheme = () => {
    try {
      localStorage.removeItem("job-trackr-theme")
      setTheme("system")
      refreshState()
    } catch (e) {
      console.error("Error resetting theme:", e)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Theme Debugger
          <Button variant="outline" size="icon" onClick={refreshState}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme State</h3>
            <div className="rounded-md border p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current theme:</span>
                <span className="font-mono">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolved theme:</span>
                <span className="font-mono">{resolvedTheme}</span>
              </div>
              <div className="flex justify-between">
                <span>System preference:</span>
                <span className="font-mono">{systemTheme}</span>
              </div>
              <div className="flex justify-between">
                <span>localStorage value:</span>
                <span className="font-mono">{localStorageTheme}</span>
              </div>
              <div className="flex justify-between">
                <span>Document class:</span>
                <span className="font-mono">{documentTheme}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme Controls</h3>
            <div className="rounded-md border p-3 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="w-full"
                >
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="w-full"
                >
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="w-full"
                >
                  <Monitor className="mr-2 h-4 w-4" /> System
                </Button>
              </div>
              <Button variant="destructive" size="sm" onClick={resetTheme} className="w-full mt-2">
                Reset Theme
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Browser Information</h3>
          <div className="rounded-md border p-3">
            <p className="text-xs font-mono break-all">{browserInfo}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Theme Test Elements</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border p-3 bg-background text-foreground">Background</div>
            <div className="rounded-md border p-3 bg-card text-card-foreground">Card</div>
            <div className="rounded-md border p-3 bg-primary text-primary-foreground">Primary</div>
            <div className="rounded-md border p-3 bg-secondary text-secondary-foreground">Secondary</div>
            <div className="rounded-md border p-3 bg-muted text-muted-foreground">Muted</div>
            <div className="rounded-md border p-3 bg-accent text-accent-foreground">Accent</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

