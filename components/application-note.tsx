"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ApplicationNoteProps {
  note: {
    id: string
    date: string
    title: string
    content: string
  }
  onDelete: () => void
}

export function ApplicationNote({ note, onDelete }: ApplicationNoteProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-medium">{note.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="mr-1 h-4 w-4" />
            {note.date}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the note.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className={`mt-2 text-sm ${isExpanded ? "" : "line-clamp-3"}`}>{note.content}</div>
      {note.content.length > 150 && (
        <Button variant="link" className="mt-1 h-auto p-0 text-xs" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  )
}

