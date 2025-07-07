"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useMemo } from "react"

interface IncomeExpensesTrendChartProps {
  dateRange: string
  categoryFilter: string
}

// Generate trend data based on selected filters
const getTrendData = (dateRange: string, categoryFilter: string) => {
  const monthlyData = [
    { month: "Jan", income: 42000, expenses: 24000, savings: 18000 },
    { month: "Feb", income: 45000, expenses: 18000, savings: 27000 },
    { month: "Mar", income: 43000, expenses: 22000, savings: 21000 },
    { month: "Apr", income: 47000, expenses: 28000, savings: 19000 },
    { month: "May", income: 45000, expenses: 26000, savings: 19000 },
    { month: "Jun", income: 48000, expenses: 32000, savings: 16000 },
    { month: "Jul", income: 45000, expenses: 29000, savings: 16000 },
    { month: "Aug", income: 45000, expenses: 28500, savings: 16500 },
  ]

  // Filter data by selected date range
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

  // Apply category-specific expense adjustments
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

    filteredData = filteredData.map((item) => {
      const adjustedExpenses = Math.round(item.expenses * expenseMultiplier)
      return {
        ...item,
        expenses: adjustedExpenses,
        savings: item.income - adjustedExpenses,
      }
    })
  }

  return filteredData
}

export function IncomeExpensesTrendChart({ dateRange, categoryFilter }: IncomeExpensesTrendChartProps) {
  const chartData = useMemo(() => getTrendData(dateRange, categoryFilter), [dateRange, categoryFilter])

  // Calculate summary statistics
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0)
  const totalSavings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : "0"

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Income vs Expenses Trend</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Track your financial patterns over time
              {categoryFilter !== "all" && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Category
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">{savingsRate}% Saved</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => [`₹${Number(value).toLocaleString("en-IN")}`, name]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                name="Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary statistics at bottom of chart */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Total Income</div>
            <div className="text-lg font-bold text-green-600">₹{totalIncome.toLocaleString("en-IN")}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Total Expenses</div>
            <div className="text-lg font-bold text-red-600">₹{totalExpenses.toLocaleString("en-IN")}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Net Savings</div>
            <div className="text-lg font-bold text-blue-600">₹{totalSavings.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
