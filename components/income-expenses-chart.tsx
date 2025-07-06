"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useMemo, useState } from "react"
import { TrendingUp, BarChart3 } from "lucide-react"

interface IncomeExpensesChartProps {
  dateRange: string
  categoryFilter: string
}

// Generate bar chart data based on filters
const getBarChartData = (dateRange: string, categoryFilter: string) => {
  const monthlyData = [
    { month: "Jan", income: 45000, expenses: 32000 },
    { month: "Feb", income: 47000, expenses: 28000 },
    { month: "Mar", income: 45000, expenses: 35000 },
    { month: "Apr", income: 48000, expenses: 30000 },
    { month: "May", income: 46000, expenses: 33000 },
    { month: "Jun", income: 49000, expenses: 29000 },
    { month: "Jul", income: 45000, expenses: 31000 },
    { month: "Aug", income: 47000, expenses: 28500 },
  ]

  // Apply date range filter
  let filteredData = monthlyData
  if (dateRange === "last-month") {
    filteredData = monthlyData.slice(-1)
  } else if (dateRange === "last-3-months") {
    filteredData = monthlyData.slice(-3)
  } else if (dateRange === "last-6-months") {
    filteredData = monthlyData.slice(-6)
  } else if (dateRange === "this-month") {
    filteredData = monthlyData.slice(-1)
  }

  // Adjust expenses based on category filter
  if (categoryFilter !== "all") {
    const categoryExpenseRatios = {
      food: 0.35,
      transport: 0.25,
      entertainment: 0.15,
      utilities: 0.2,
      shopping: 0.3,
      healthcare: 0.1,
    }

    const expenseMultiplier = categoryExpenseRatios[categoryFilter as keyof typeof categoryExpenseRatios] || 0.3

    filteredData = filteredData.map((item) => ({
      ...item,
      expenses: Math.round(item.expenses * expenseMultiplier),
    }))
  }

  return filteredData
}

export function IncomeExpensesChart({ dateRange, categoryFilter }: IncomeExpensesChartProps) {
  const chartData = useMemo(() => getBarChartData(dateRange, categoryFilter), [dateRange, categoryFilter])
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals for display
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0)

  // Simulate loading when filters change
  useMemo(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [dateRange, categoryFilter])

  return (
    <Card
      className="bg-white border border-gray-200 shadow-md hover:shadow-xl rounded-xl 
      transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-1
      animate-in fade-in slide-in-from-bottom-6 mx-2 sm:mx-0"
    >
      <CardHeader className="pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                Income vs Expenses
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    Income: ₹{totalIncome.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">
                    Expenses: ₹{totalExpenses.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" />
            <span className="text-xs sm:text-sm font-bold text-green-600">
              {(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}% Saved
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        {isLoading ? (
          <div className="w-full h-64 md:h-80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500 animate-pulse">Loading chart data...</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-64 md:h-80 animate-in fade-in duration-700">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#666" }}
                  className="text-xs sm:text-sm"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#666" }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                  className="text-xs sm:text-sm"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px",
                  }}
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    name === "income" ? "Income" : "Expenses",
                  ]}
                  animationDuration={300}
                />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={50}
                  name="income"
                  animationDuration={1500}
                  animationBegin={0}
                />
                <Bar
                  dataKey="expenses"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={50}
                  name="expenses"
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
