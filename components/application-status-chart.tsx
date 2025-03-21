"use client"

import {useTheme} from "next-themes"
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from "recharts"

const data = [
    {name: "Applied", value: 12, color: "#3b82f6"},
    {name: "Phone Screen", value: 5, color: "#8b5cf6"},
    {name: "Interview", value: 4, color: "#10b981"},
    {name: "Offer", value: 1, color: "#f59e0b"},
    {name: "Rejected", value: 2, color: "#ef4444"},
]

export function ApplicationStatusChart() {
    const {theme} = useTheme()
    const isDark = theme === "dark"

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

