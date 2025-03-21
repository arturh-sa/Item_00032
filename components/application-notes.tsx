"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react"
import {ApplicationNote} from "@/components/application-note"
import {ApplicationNoteForm} from "@/components/application-note-form"
import {useToast} from "@/components/ui/use-toast"

// Change the interface to remove the unused applicationId prop
type ApplicationNotesProps = {}

// Update the initialNotes array by changing all dates from 2023-10-xx to 2025-02-xx and 2023-11-xx to 2025-03-xx

// Mock data for demonstration
const initialNotes = [
    {
        id: "1",
        date: "2025-03-10",
        title: "Initial Research",
        content:
            "Researched the company and found they have a strong focus on AI and machine learning. Their tech stack includes React, Next.js, and Node.js.",
    },
    {
        id: "2",
        date: "2025-03-15",
        title: "Preparation Notes",
        content:
            "Prepared answers for common interview questions. Reviewed my projects that are most relevant to this role.",
    },
]

// Update the function signature to remove the unused parameter
export function ApplicationNotes() {
    const [notes, setNotes] = useState(initialNotes)
    const [showForm, setShowForm] = useState(false)
    const {toast} = useToast()

    const addNote = (note: any) => {
        const newNote = {
            id: Date.now().toString(),
            date: new Date().toISOString().split("T")[0],
            ...note,
        }
        setNotes([...notes, newNote])
        setShowForm(false)

        toast({
            title: "Note added",
            description: "Your note has been successfully added.",
        })
    }

    const editNote = (id: string, updatedNote: { title: string; content: string }) => {
        setNotes(
            notes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        title: updatedNote.title,
                        content: updatedNote.content,
                    }
                    : note,
            ),
        )

        toast({
            title: "Note updated",
            description: "Your note has been successfully updated.",
        })
    }

    const deleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id))

        toast({
            title: "Note deleted",
            description: "Your note has been successfully deleted.",
        })
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">Notes</CardTitle>
                    <Button size="sm" onClick={() => setShowForm(!showForm)}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Add Note
                    </Button>
                </CardHeader>
                <CardContent>
                    {showForm && (
                        <div className="mb-6">
                            <ApplicationNoteForm onSubmit={addNote} onCancel={() => setShowForm(false)}/>
                        </div>
                    )}
                    <div className="space-y-4">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <ApplicationNote key={note.id} note={note} onDelete={() => deleteNote(note.id)}
                                                 onEdit={editNote}/>
                            ))
                        ) : (
                            <div className="text-center py-4 text-muted-foreground">
                                No notes yet. Add your first note to keep track of important information.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

