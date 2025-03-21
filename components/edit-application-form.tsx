"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {format, parse} from "date-fns"
import {CalendarIcon, AlertCircle} from "lucide-react"
import {useRouter} from "next/navigation"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {useApplications, type Application} from "@/contexts/applications-context"
import {useToast} from "@/components/ui/use-toast"

const formSchema = z.object({
    company: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    position: z.string().min(2, {
        message: "Position must be at least 2 characters.",
    }),
    location: z.string().optional(),
    jobType: z.string().optional(),
    status: z.string(),
    url: z.string().url({message: "Please enter a valid URL."}).optional().or(z.literal("")),
    salary: z.string().optional(),
    dateApplied: z.date(),
    description: z.string().optional(),
    notes: z.string().optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().email({message: "Please enter a valid email."}).optional().or(z.literal("")),
    contactPhone: z.string().optional(),
})

interface EditApplicationFormProps {
    application: Application
}

export function EditApplicationForm({application}: EditApplicationFormProps) {
    const router = useRouter()
    const {updateApplication} = useApplications()
    const {toast} = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Parse the date string to a Date object
    const parsedDate = parse(application.dateApplied, "yyyy-MM-dd", new Date())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: application.company,
            position: application.position,
            location: application.location || "",
            jobType: application.jobType || "",
            status: application.status,
            url: application.url || "",
            salary: application.salary || "",
            dateApplied: parsedDate,
            description: application.description || "",
            notes: application.notes || "",
            contactName: application.contactName || "",
            contactEmail: application.contactEmail || "",
            contactPhone: application.contactPhone || "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Format the date back to string format
        const formattedDate = format(values.dateApplied, "yyyy-MM-dd")

        // Update the application in the context
        updateApplication(application.id, {
            ...values,
            dateApplied: formattedDate,
        })

        // Show success toast
        toast({
            title: "Application updated",
            description: "Your job application has been successfully updated.",
        })

        // Redirect to application details page
        setTimeout(() => {
            router.push(`/applications/${application.id}`)
            setIsSubmitting(false)
        }, 500)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Company name"
                                            {...field}
                                            className={cn(form.formState.errors.company && "border-red-500 focus-visible:ring-red-500 pr-10")}
                                        />
                                        {form.formState.errors.company && (
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <AlertCircle className="h-5 w-5 text-red-500"/>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="position"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Job title"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.position && "border-red-500 focus-visible:ring-red-500 pr-10",
                                            )}
                                        />
                                        {form.formState.errors.position && (
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <AlertCircle className="h-5 w-5 text-red-500"/>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="City, State or Remote" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="jobType"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(form.formState.errors.jobType && "border-red-500 focus-visible:ring-red-500")}
                                        >
                                            <SelectValue placeholder="Select job type"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="full-time">Full-time</SelectItem>
                                        <SelectItem value="part-time">Part-time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="freelance">Freelance</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(form.formState.errors.status && "border-red-500 focus-visible:ring-red-500")}
                                        >
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Applied">Applied</SelectItem>
                                        <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                                        <SelectItem value="Interview">Interview</SelectItem>
                                        <SelectItem value="Offer">Offer</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job URL</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="https://example.com/job"
                                            {...field}
                                            className={cn(form.formState.errors.url && "border-red-500 focus-visible:ring-red-500 pr-10")}
                                        />
                                        {form.formState.errors.url && (
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <AlertCircle className="h-5 w-5 text-red-500"/>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Salary Range</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateApplied"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date Applied</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                    form.formState.errors.dateApplied && "border-red-500 focus-visible:ring-red-500",
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
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Textarea
                                        placeholder="Enter job description"
                                        className={cn(
                                            "min-h-[100px]",
                                            form.formState.errors.description && "border-red-500 focus-visible:ring-red-500",
                                        )}
                                        {...field}
                                    />
                                    {form.formState.errors.description && (
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

                <FormField
                    control={form.control}
                    name="notes"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add any personal notes about this application"
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 font-medium"/>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="contactName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Contact Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contact person" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="contact@example.com"
                                            {...field}
                                            className={cn(
                                                form.formState.errors.contactEmail && "border-red-500 focus-visible:ring-red-500 pr-10",
                                            )}
                                        />
                                        {form.formState.errors.contactEmail && (
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <AlertCircle className="h-5 w-5 text-red-500"/>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Contact Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium"/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => router.push(`/applications/${application.id}`)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

