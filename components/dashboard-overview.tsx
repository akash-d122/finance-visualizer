"use client"

import { useState } from "react"
// STAGE 2 FEATURE COMMENTED OUT - SummaryCards, CategoryChart, DashboardFilters, IncomeExpensesTrendChart imports removed
import { RecentTransactions } from "./recent-transactions"
import { IncomeExpensesChart } from "./income-expenses-chart"

interface DashboardOverviewProps {
  onAddTransaction: () => void
  onNavigate?: (page: string) => void
}

// Main dashboard component - shows financial overview and key metrics
// I designed this to be clean and focused on the essentials for Stage 1
export function DashboardOverview({ onAddTransaction, onNavigate }: DashboardOverviewProps) {
  // Fixed date range for Stage 1 - could be made configurable later
  const [dateRange] = useState("last-6-months")

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>

      {/* Charts section - focused on the core visualization for Stage 1 */}
      <div className="space-y-6">
        {/* Monthly expenses chart - the main visualization component */}
        <IncomeExpensesChart dateRange={dateRange} categoryFilter="all" />
      </div>

      {/* Recent transactions section */}
      <RecentTransactions onAddTransaction={onAddTransaction} />
    </div>
  )
}
