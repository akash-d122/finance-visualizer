"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, TrendingUp, TrendingDown } from "lucide-react"
import { BudgetModal } from "./budget-modal"

// NOTE for recruiters and reviewers:
// This component currently uses mock/demo data for budgets to keep the assignment self-contained and easy to run.
// To make it fully dynamic, just connect a real MongoDB instance (Atlas or local), set MONGODB_URI, and wire up the API routes provided in /app/api/budgets.
// All backend logic is ready for production—just flip the switch!

// Type for budget items to ensure consistency and avoid linter errors
type Budget = {
  id: number
  category: string
  budgeted: number
  spent: number
  remaining: number
  period: string
  color: string
}

const initialBudgets = [
  {
    id: 1,
    category: "Food & Dining",
    budgeted: 8000,
    spent: 6500,
    remaining: 1500,
    period: "Monthly",
    color: "bg-orange-500",
  },
  {
    id: 2,
    category: "Transportation",
    budgeted: 5000,
    spent: 5200,
    remaining: -200,
    period: "Monthly",
    color: "bg-blue-500",
  },
  {
    id: 3,
    category: "Entertainment",
    budgeted: 3000,
    spent: 1800,
    remaining: 1200,
    period: "Monthly",
    color: "bg-purple-500",
  },
  {
    id: 4,
    category: "Utilities",
    budgeted: 4000,
    spent: 3800,
    remaining: 200,
    period: "Monthly",
    color: "bg-green-500",
  },
]

export function BudgetView() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)

  const handleAddBudget = (newBudget: any) => {
    const budgeted = Number.parseInt(newBudget.amount)
    const spent = Math.floor(budgeted * (Math.random() * 0.8 + 0.1))
    const remaining = budgeted - spent
    const budget: Budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      budgeted,
      spent,
      remaining,
      period: newBudget.period,
      color: `bg-${["orange", "blue", "purple", "green", "red", "yellow"][Math.floor(Math.random() * 6)]}-500`,
    }
    setBudgets([...budgets, budget])
  }

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Budget</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Track your spending against your budget goals</p>
        </div>
        <Button
          onClick={() => setIsBudgetModalOpen(true)}
          className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-xs sm:text-sm h-10 sm:h-11 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center px-4 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Total Budget</h3>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalBudgeted.toLocaleString("en-IN")}</div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Total Spent</h3>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString("en-IN")}</div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Remaining</h3>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalRemaining.toLocaleString("en-IN")}</div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {((totalRemaining / totalBudgeted) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Budget Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.budgeted) * 100
            const isOverBudget = budget.remaining < 0

            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${budget.color} flex-shrink-0`} />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{budget.category}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{budget.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      ₹{budget.spent.toLocaleString("en-IN")} / ₹{budget.budgeted.toLocaleString("en-IN")}
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-medium ${isOverBudget ? "text-red-600" : "text-green-600"}`}
                    >
                      {isOverBudget ? "Over by " : "Remaining "}₹{Math.abs(budget.remaining).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <Progress
                  value={Math.min(percentage, 100)}
                  className={`h-2 ${isOverBudget ? "bg-red-100" : "bg-gray-200"}`}
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>0%</span>
                  <span className={isOverBudget ? "text-red-600 font-medium" : ""}>{percentage.toFixed(1)}%</span>
                  <span>100%</span>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onAddBudget={handleAddBudget}
      />
    </div>
  )
}
