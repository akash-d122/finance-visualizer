"use client"
import { DashboardOverview } from "./dashboard-overview"
import { TransactionsList } from "./transactions-list"
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
    // STAGE 2 FEATURE COMMENTED OUT - Budget and Settings cases removed
    default:
      return <DashboardOverview onAddTransaction={onAddTransaction} onNavigate={onNavigate} />
  }
}
