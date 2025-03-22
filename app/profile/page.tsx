"use client"

import {useState, useEffect} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {useToast} from "@/components/ui/use-toast"
import {AlertCircle} from "lucide-react"
import {cn} from "@/lib/utils"

// Define validation schema
const profileFormSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters."}),
    email: z.string().email({message: "Please enter a valid email address."}),
    title: z.string().min(2, {message: "Job title must be at least 2 characters."}),
    location: z.string().optional(),
    bio: z.string().max(500, {message: "Bio must not exceed 500 characters."}).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfilePage() {
    const {toast} = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Initialize form with default values
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "John Doe",
            email: "john.doe@example.com",
            title: "Frontend Developer",
            location: "San Francisco, CA",
            bio: "Frontend developer with 5 years of experience in React and Next.js.",
        },
    })

    // Load profile data from localStorage on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem("profile")
        if (savedProfile) {
            try {
                const profileData = JSON.parse(savedProfile)
                form.reset(profileData)
            } catch (error) {
                console.error("Failed to parse profile data:", error)
            }
        }
    }, [form])

    function onSubmit(data: ProfileFormValues) {
        setIsSubmitting(true)

        // Save to localStorage
        localStorage.setItem("profile", JSON.stringify(data))

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Profile updated",
                description: "Your profile information has been successfully updated.",
            })
            setIsSubmitting(false)
        }, 1000)
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Profile" text="Manage your account settings and preferences."/>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            className={cn(
                                                                form.formState.errors.name && "border-red-500 focus-visible:ring-red-500 pr-10",
                                                            )}
                                                        />
                                                        {form.formState.errors.name && (
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
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="email"
                                                            {...field}
                                                            className={cn(
                                                                form.formState.errors.email && "border-red-500 focus-visible:ring-red-500 pr-10",
                                                            )}
                                                        />
                                                        {form.formState.errors.email && (
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
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Job Title</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            className={cn(
                                                                form.formState.errors.title && "border-red-500 focus-visible:ring-red-500 pr-10",
                                                            )}
                                                        />
                                                        {form.formState.errors.title && (
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
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-500 font-medium"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Textarea
                                                        className={cn(
                                                            "min-h-[100px]",
                                                            form.formState.errors.bio && "border-red-500 focus-visible:ring-red-500",
                                                        )}
                                                        {...field}
                                                    />
                                                    {form.formState.errors.bio && (
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

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </DashboardShell>
    )
}

