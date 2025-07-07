"use client"

import { useState } from "react"
// STAGE 2 FEATURE COMMENTED OUT - SummaryCards, CategoryChart, DashboardFilters, IncomeExpensesTrendChart imports removed
import { SummaryCards } from "./summary-cards"
import { CategoryChart } from "./category-chart"
import { DashboardFilters } from "./dashboard-filters"
import { IncomeExpensesTrendChart } from "./income-expenses-trend-chart"
import { RecentTransactions } from "./recent-transactions"
import { IncomeExpensesChart } from "./income-expenses-chart"

interface DashboardOverviewProps {
  onAddTransaction: () => void
  onNavigate?: (page: string) => void
}

// Main dashboard component - shows financial overview and key metrics
// I designed this to be clean and focused on the essentials for Stage 1
export function DashboardOverview({ onAddTransaction, onNavigate }: DashboardOverviewProps) {
  // Stage 2: Add state for date range and category filter
  const [dateRange, setDateRange] = useState("last-6-months")
  const [categoryFilter, setCategoryFilter] = useState("all")

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>

      {/* Dashboard filters - Stage 2 restored! */}
      <DashboardFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
      />

      {/* Summary cards - Stage 2 restored! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SummaryCards dateRange={dateRange} categoryFilter={categoryFilter} onNavigate={onNavigate} />
      </div>

      {/* Charts section - focused on the core visualization for Stage 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly expenses chart */}
        <IncomeExpensesChart dateRange={dateRange} categoryFilter={categoryFilter} />
        {/* Category pie chart - Stage 2 restored! */}
        <CategoryChart dateRange={dateRange} categoryFilter={categoryFilter} />
      </div>

      {/* Trend chart - Stage 2 restored! */}
      <div>
        <IncomeExpensesTrendChart dateRange={dateRange} categoryFilter={categoryFilter} />
      </div>

      {/* Recent transactions section */}
      <RecentTransactions onAddTransaction={onAddTransaction} />
    </div>
  )
}
