"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content"
import { TransactionModal } from "@/components/transaction-modal"
import { MobileHeader } from "@/components/mobile-header"
import { BudgetModal } from "@/components/budget-modal"

// Main application component - handles the overall layout and state management
// I kept this simple for Stage 1, focusing on core transaction tracking functionality
export default function FinanceVisualizer() {
  // Core navigation state - only dashboard and transactions for Stage 1
  // This keeps the app focused and user-friendly without overwhelming features
  const [currentView, setCurrentView] = useState<"dashboard" | "transactions" | "budget" | "settings">("dashboard")
  
  // Modal states for user interactions
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  // Transaction data - using local state for Stage 1 demo
  // In a real app, this would connect to a database
  const [userTransactions, setUserTransactions] = useState<any[]>([])

  // Handle navigation between main views
  const handleViewChange = (view: string) => {
    if (view === "dashboard" || view === "transactions" || view === "budget" || view === "settings") {
      setCurrentView(view as "dashboard" | "transactions" | "budget" | "settings")
    }
  }

  // Process new transaction from the form
  // This is where I'd add validation and database calls in a full implementation
  const handleNewTransaction = (transactionData: any) => {
    const newTransaction = {
      id: Date.now(), // Simple ID for demo - would use proper UUID in production
      name: transactionData.description || "New Transaction",
      date: transactionData.date || new Date().toISOString().split("T")[0],
      amount: Number(transactionData.amount) || 0,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Success",
      type: transactionData.type || "expense",
    }
    
    // Add to the beginning of the list for better UX
    setUserTransactions((prev) => [newTransaction, ...prev])
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar - hidden on mobile for better UX */}
      <aside className="w-60 h-screen sticky top-0 bg-white shadow-lg border-r border-gray-200 hidden md:block">
        <AppSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onAddTransaction={() => setShowTransactionModal(true)}
          onAddBudget={() => setShowBudgetModal(true)}
        />
      </aside>

      {/* Mobile menu overlay - slides in from left */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
          <aside className="fixed left-0 top-0 w-60 h-full bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col">
            <AppSidebar
              currentView={currentView}
              onViewChange={(view) => {
                setCurrentView(view)
                setShowMobileMenu(false)
              }}
              onAddTransaction={() => {
                setShowTransactionModal(true)
                setShowMobileMenu(false)
              }}
              onAddBudget={() => {
                setShowBudgetModal(true)
                setShowMobileMenu(false)
              }}
            />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile header - only visible on small screens */}
        <div className="md:hidden">
          <MobileHeader
            onMenuClick={() => setShowMobileMenu(true)}
            currentView={currentView}
            onNavigate={handleViewChange}
          />
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block">
          <DashboardHeader currentView={currentView} onNavigate={handleViewChange} />
        </div>

        {/* Dynamic content based on current view */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <DashboardContent
            currentView={currentView}
            onAddTransaction={() => setShowTransactionModal(true)}
            onNavigate={handleViewChange}
            transactions={userTransactions}
          />
        </div>
      </main>

      {/* Transaction modal - appears when user wants to add a new transaction */}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onAddTransaction={handleNewTransaction}
      />
      {/* Budget modal - appears when user wants to add a new budget */}
      <BudgetModal
        isOpen={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onAddBudget={() => {}}
      />
    </div>
  )
}
