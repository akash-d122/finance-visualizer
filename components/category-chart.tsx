"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useState, useMemo } from "react"
import { PieChartIcon } from "lucide-react"

// Custom label renderer for pie chart percentages
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
      className="drop-shadow-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Generate category data based on date range and filters
const getCategoryData = (dateRange: string, categoryFilter: string) => {
  // Different spending patterns for different time periods
  const dateRangeData = {
    "this-month": [
      { name: "Food & Dining", value: 8500, color: "#ff6b6b", key: "food" },
      { name: "Transportation", value: 3200, color: "#4ecdc4", key: "transport" },
      { name: "Entertainment", value: 1200, color: "#45b7d1", key: "entertainment" },
      { name: "Utilities", value: 2800, color: "#96ceb4", key: "utilities" },
      { name: "Shopping", value: 1800, color: "#feca57", key: "shopping" },
      { name: "Healthcare", value: 800, color: "#ff9ff3", key: "healthcare" },
    ],
    "last-month": [
      { name: "Food & Dining", value: 6200, color: "#ff6b6b", key: "food" },
      { name: "Transportation", value: 4800, color: "#4ecdc4", key: "transport" },
      { name: "Entertainment", value: 2400, color: "#45b7d1", key: "entertainment" },
      { name: "Utilities", value: 3100, color: "#96ceb4", key: "utilities" },
      { name: "Shopping", value: 3200, color: "#feca57", key: "shopping" },
      { name: "Healthcare", value: 1500, color: "#ff9ff3", key: "healthcare" },
    ],
    "last-3-months": [
      { name: "Food & Dining", value: 18500, color: "#ff6b6b", key: "food" },
      { name: "Transportation", value: 12200, color: "#4ecdc4", key: "transport" },
      { name: "Entertainment", value: 8400, color: "#45b7d1", key: "entertainment" },
      { name: "Utilities", value: 9100, color: "#96ceb4", key: "utilities" },
      { name: "Shopping", value: 6800, color: "#feca57", key: "shopping" },
      { name: "Healthcare", value: 4200, color: "#ff9ff3", key: "healthcare" },
    ],
    "last-6-months": [
      { name: "Food & Dining", value: 32500, color: "#ff6b6b", key: "food" },
      { name: "Transportation", value: 28200, color: "#4ecdc4", key: "transport" },
      { name: "Entertainment", value: 15400, color: "#45b7d1", key: "entertainment" },
      { name: "Utilities", value: 18100, color: "#96ceb4", key: "utilities" },
      { name: "Shopping", value: 22800, color: "#feca57", key: "shopping" },
      { name: "Healthcare", value: 8200, color: "#ff9ff3", key: "healthcare" },
    ],
    "this-year": [
      { name: "Food & Dining", value: 45500, color: "#ff6b6b", key: "food" },
      { name: "Transportation", value: 38200, color: "#4ecdc4", key: "transport" },
      { name: "Entertainment", value: 28400, color: "#45b7d1", key: "entertainment" },
      { name: "Utilities", value: 32100, color: "#96ceb4", key: "utilities" },
      { name: "Shopping", value: 35800, color: "#feca57", key: "shopping" },
      { name: "Healthcare", value: 12200, color: "#ff9ff3", key: "healthcare" },
    ],
  }

  let data = dateRangeData[dateRange as keyof typeof dateRangeData] || dateRangeData["this-month"]

  // Show subcategory breakdown when specific category is selected
  if (categoryFilter !== "all") {
    const selectedCategory = data.find((item) => item.key === categoryFilter)

    if (selectedCategory) {
      const subcategoryBreakdowns = {
        food: [
          {
            name: "Restaurants",
            value: Math.round(selectedCategory.value * 0.45),
            color: "#ff6b6b",
            key: "food-restaurants",
          },
          {
            name: "Groceries",
            value: Math.round(selectedCategory.value * 0.3),
            color: "#ff8a80",
            key: "food-groceries",
          },
          { name: "Delivery", value: Math.round(selectedCategory.value * 0.2), color: "#ffab91", key: "food-delivery" },
          { name: "Snacks", value: Math.round(selectedCategory.value * 0.05), color: "#ffcc02", key: "food-snacks" },
        ],
        transport: [
          { name: "Fuel", value: Math.round(selectedCategory.value * 0.6), color: "#4ecdc4", key: "transport-fuel" },
          {
            name: "Public Transport",
            value: Math.round(selectedCategory.value * 0.25),
            color: "#26c6da",
            key: "transport-public",
          },
          {
            name: "Maintenance",
            value: Math.round(selectedCategory.value * 0.1),
            color: "#00acc1",
            key: "transport-maintenance",
          },
          {
            name: "Parking",
            value: Math.round(selectedCategory.value * 0.05),
            color: "#0097a7",
            key: "transport-parking",
          },
        ],
        entertainment: [
          {
            name: "Movies",
            value: Math.round(selectedCategory.value * 0.35),
            color: "#45b7d1",
            key: "entertainment-movies",
          },
          {
            name: "Streaming",
            value: Math.round(selectedCategory.value * 0.3),
            color: "#42a5f5",
            key: "entertainment-streaming",
          },
          {
            name: "Games",
            value: Math.round(selectedCategory.value * 0.25),
            color: "#5c6bc0",
            key: "entertainment-games",
          },
          {
            name: "Events",
            value: Math.round(selectedCategory.value * 0.1),
            color: "#7986cb",
            key: "entertainment-events",
          },
        ],
        utilities: [
          {
            name: "Electricity",
            value: Math.round(selectedCategory.value * 0.5),
            color: "#96ceb4",
            key: "utilities-electricity",
          },
          {
            name: "Internet",
            value: Math.round(selectedCategory.value * 0.2),
            color: "#81c784",
            key: "utilities-internet",
          },
          { name: "Water", value: Math.round(selectedCategory.value * 0.2), color: "#a5d6a7", key: "utilities-water" },
          { name: "Gas", value: Math.round(selectedCategory.value * 0.1), color: "#c8e6c9", key: "utilities-gas" },
        ],
        shopping: [
          {
            name: "Clothing",
            value: Math.round(selectedCategory.value * 0.4),
            color: "#feca57",
            key: "shopping-clothing",
          },
          {
            name: "Electronics",
            value: Math.round(selectedCategory.value * 0.35),
            color: "#ffb74d",
            key: "shopping-electronics",
          },
          {
            name: "Home Items",
            value: Math.round(selectedCategory.value * 0.15),
            color: "#ffcc02",
            key: "shopping-home",
          },
          { name: "Books", value: Math.round(selectedCategory.value * 0.1), color: "#ffd54f", key: "shopping-books" },
        ],
        healthcare: [
          {
            name: "Doctor Visits",
            value: Math.round(selectedCategory.value * 0.5),
            color: "#ff9ff3",
            key: "healthcare-doctor",
          },
          {
            name: "Medicines",
            value: Math.round(selectedCategory.value * 0.3),
            color: "#f8bbd9",
            key: "healthcare-medicines",
          },
          {
            name: "Insurance",
            value: Math.round(selectedCategory.value * 0.15),
            color: "#f48fb1",
            key: "healthcare-insurance",
          },
          {
            name: "Tests",
            value: Math.round(selectedCategory.value * 0.05),
            color: "#f06292",
            key: "healthcare-tests",
          },
        ],
      }

      data = subcategoryBreakdowns[categoryFilter as keyof typeof subcategoryBreakdowns] || data
    }
  }

  // Add percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0)
  return data.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }))
}

interface CategoryChartProps {
  dateRange: string
  categoryFilter: string
}

export function CategoryChart({ dateRange, categoryFilter }: CategoryChartProps) {
  const categoryData = useMemo(() => getCategoryData(dateRange, categoryFilter), [dateRange, categoryFilter])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0)

  // Simulate loading when filters change
  useMemo(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [dateRange, categoryFilter])

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const handlePieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-md hover:shadow-xl rounded-xl animate-in fade-in zoom-in-90 slide-in-from-bottom-4 duration-700">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 flex flex-row items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <PieChartIcon className="w-5 h-5 text-orange-600" />
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
