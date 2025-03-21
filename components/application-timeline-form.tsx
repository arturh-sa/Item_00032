"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {format} from "date-fns"
import {CalendarIcon, AlertCircle} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"

const formSchema = z.object({
    date: z.date(),
    type: z.string().min(1, {message: "Please select an event type"}),
    notes: z.string().optional(),
})

interface ApplicationTimelineFormProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void
    onCancel: () => void
}

export function ApplicationTimelineForm({onSubmit, onCancel}: ApplicationTimelineFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date(),
            type: "",
            notes: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                    form.formState.errors.date && "border-red-500 focus-visible:ring-red-500",
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                                                  initialFocus/>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Event Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(form.formState.errors.type && "border-red-500 focus-visible:ring-red-500")}
                                        >
                                            <SelectValue placeholder="Select event type"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Applied">Applied</SelectItem>
                                        <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                                        <SelectItem value="Technical Interview">Technical Interview</SelectItem>
                                        <SelectItem value="Onsite Interview">Onsite Interview</SelectItem>
                                        <SelectItem value="Offer">Offer</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                        <SelectItem value="Accepted">Accepted</SelectItem>
                                        <SelectItem value="Declined">Declined</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="notes"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Textarea
                                        placeholder="Add notes about this event"
                                        className={cn(
                                            "min-h-[100px]",
                                            form.formState.errors.notes && "border-red-500 focus-visible:ring-red-500",
                                        )}
                                        {...field}
                                    />
                                    {form.formState.errors.notes && (
                                        <div className="absolute top-3 right-3 pointer-events-none">
                                            <AlertCircle className="h-5 w-5 text-red-500"/>
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-500 font-medium"/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Save Event</Button>
                </div>
            </form>
        </Form>
    )
}

