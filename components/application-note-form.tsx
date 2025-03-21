"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(5, {
    message: "Content must be at least 5 characters.",
  }),
})

interface ApplicationNoteFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onCancel: () => void
  defaultValues?: {
    title: string
    content: string
  }
  submitLabel?: string
}

export function ApplicationNoteForm({
  onSubmit,
  onCancel,
  defaultValues = { title: "", content: "" },
  submitLabel = "Save Note",
}: ApplicationNoteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Note title"
                    {...field}
                    className={cn(form.formState.errors.title && "border-red-500 focus-visible:ring-red-500 pr-10")}
                  />
                  {form.formState.errors.title && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Write your note here..."
                    className={cn(
                      "min-h-[150px]",
                      form.formState.errors.content && "border-red-500 focus-visible:ring-red-500",
                    )}
                    {...field}
                  />
                  {form.formState.errors.content && (
                    <div className="absolute top-3 right-3 pointer-events-none">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  )
}

