"use client"
import { DashboardOverview } from "./dashboard-overview"
import { TransactionsList } from "./transactions-list"
import { BudgetView } from "./budget-view"
import { SettingsView } from "./settings-view"
// STAGE 2 FEATURE COMMENTED OUT - BudgetView and SettingsView imports removed

interface DashboardContentProps {
  currentView: string
  onAddTransaction: () => void
  onNavigate?: (page: string) => void
  transactions?: any[] // User's transaction data
}

// Main content router - determines what to show based on current view
// I kept this simple for Stage 1, but it's designed to easily handle more views later
export function DashboardContent({
  currentView,
  onAddTransaction,
  onNavigate,
  transactions = [],
}: DashboardContentProps) {
  switch (currentView) {
    case "transactions":
      return <TransactionsList onAddTransaction={onAddTransaction} transactions={transactions} />
    case "budget":
      // Budget management view - track and visualize your budgets
      return <BudgetView />
    case "settings":
      // Settings page - manage preferences and data
      return <SettingsView />
    default:
      // Stage 2: Dashboard overview with analytics and filters
      return <DashboardOverview onAddTransaction={onAddTransaction} onNavigate={onNavigate} />
  }
}
