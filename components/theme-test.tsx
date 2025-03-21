"use client"

import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Laptop } from "lucide-react"

export function ThemeTest() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Theme Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Current theme:</span>
          <span className="font-medium">
            {theme === "light" && (
              <span className="flex items-center">
                <Sun className="mr-2 h-4 w-4" /> Light
              </span>
            )}
            {theme === "dark" && (
              <span className="flex items-center">
                <Moon className="mr-2 h-4 w-4" /> Dark
              </span>
            )}
            {theme === "system" && (
              <span className="flex items-center">
                <Laptop className="mr-2 h-4 w-4" /> System
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">Change theme:</div>
          <div className="flex space-x-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("light")}
              className="flex-1"
            >
              <Sun className="mr-2 h-4 w-4" /> Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("dark")}
              className="flex-1"
            >
              <Moon className="mr-2 h-4 w-4" /> Dark
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              onClick={() => setTheme("system")}
              className="flex-1"
            >
              <Laptop className="mr-2 h-4 w-4" /> System
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="rounded-md border p-4 bg-background text-foreground">Background</div>
          <div className="rounded-md border p-4 bg-card text-card-foreground">Card</div>
          <div className="rounded-md border p-4 bg-primary text-primary-foreground">Primary</div>
          <div className="rounded-md border p-4 bg-secondary text-secondary-foreground">Secondary</div>
          <div className="rounded-md border p-4 bg-muted text-muted-foreground">Muted</div>
          <div className="rounded-md border p-4 bg-accent text-accent-foreground">Accent</div>
        </div>
      </CardContent>
    </Card>
  )
}

