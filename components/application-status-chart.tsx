"use client"

import {useTheme} from "next-themes"
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from "recharts"
import {useEffect, useState} from "react"

const data = [
    {name: "Applied", value: 12, color: "#3b82f6"},
    {name: "Phone Screen", value: 5, color: "#8b5cf6"},
    {name: "Interview", value: 4, color: "#10b981"},
    {name: "Offer", value: 1, color: "#f59e0b"},
    {name: "Rejected", value: 2, color: "#ef4444"},
]

export function ApplicationStatusChart() {
    const {theme} = useTheme()
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Check for mobile screen size
    useEffect(() => {
        setMounted(true)
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) return null

    // Explicitly check if theme is 'dark'
    const isDark = theme === "dark"
    console.log("Current theme:", theme) // Debug log to verify theme detection

    // Update the renderCustomizedLabel function to ensure all percentages are visible
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, name}: any) => {
        const RADIAN = Math.PI / 180

        // Calculate position - always inside the slice
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6

        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        // Only render label if percentage is at least 1%
        if (percent < 0.01) return null

        return (
            <text
                x={x}
                y={y}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isMobile ? 10 : 12}
                fontWeight="bold"
                style={{textShadow: "0px 0px 2px rgba(0,0,0,0.8)"}}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? "#1f2937" : "#ffffff",
                            borderColor: isDark ? "#374151" : "#e5e7eb",
                            color: isDark ? "#ffffff" : "#000000",
                        }}
                    />
                    <Legend
                        layout={isMobile ? "horizontal" : "vertical"}
                        verticalAlign={isMobile ? "bottom" : "middle"}
                        align={isMobile ? "center" : "right"}
                        wrapperStyle={isMobile ? {paddingTop: "20px"} : {}}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

