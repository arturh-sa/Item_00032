"use client"

import * as React from "react"

import type {ToastActionElement, ToastProps} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
    id: string
    title?: React.ReactNode
    description?: React.ReactNode
    action?: ToastActionElement
}

type ToastContextType = {
    toasts: ToasterToast[]
    addToast: (toast: Omit<ToasterToast, "id">) => void
    removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastContextProvider({children}: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<ToasterToast[]>([])

    const addToast = React.useCallback((toast: Omit<ToasterToast, "id">) => {
        setToasts((prevToasts) => {
            const id = Math.random().toString(36).substring(2, 9)

            // Remove toast after delay
            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
            }, TOAST_REMOVE_DELAY)

            return [...prevToasts, {...toast, id}].slice(-TOAST_LIMIT)
        })
    }, [])

    const removeToast = React.useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, [])

    const contextValue = React.useMemo(
        () => ({
            toasts,
            addToast,
            removeToast,
        }),
        [toasts, addToast, removeToast],
    )

    return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
}

export function useToast() {
    const context = React.useContext(ToastContext)

    if (!context) {
        throw new Error("useToast must be used within a ToastContextProvider")
    }

    return {
        toasts: context.toasts,
        toast: (props: Omit<ToasterToast, "id">) => {
            context.addToast(props)
        },
        dismiss: (id: string) => {
            context.removeToast(id)
        },
    }
}

