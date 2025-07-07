"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, CreditCard, Plus, TrendingUp, Wallet, Settings, PieChart } from "lucide-react"

interface AppSidebarProps {
  currentView: string
  onViewChange: (view: "dashboard" | "transactions" | "budget" | "settings") => void
  onAddTransaction: () => void
  onAddBudget?: () => void // Optional handler for Add Budget modal
}

// Sidebar component - handles navigation and quick actions
// I designed this to be clean and intuitive, with just the essentials for Stage 1
export function AppSidebar({ currentView, onViewChange, onAddTransaction, onAddBudget }: AppSidebarProps) {
  // Navigation items - keeping it simple for Stage 1
  // Could easily extend this for future features like budget tracking
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      isActive: currentView === "dashboard",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: CreditCard,
      isActive: currentView === "transactions",
    },
    {
      id: "budget",
      label: "Budget",
      icon: PieChart,
      isActive: currentView === "budget",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      isActive: currentView === "settings",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* App header with logo and title */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Wallet className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-gray-900 text-sm sm:text-base truncate">Personal Finance Visualizer</h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Track & Analyze</p>
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="p-4 sm:p-6 space-y-2 sm:space-y-3 flex-shrink-0">
        <Button
          onClick={onAddTransaction}
          className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-700 focus:ring-2 focus:ring-orange-300 text-white text-xs sm:text-sm h-10 sm:h-11 rounded-xl shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
        {/* Add Budget quick action - opens modal if handler provided, else navigates to Budget page */}
        <Button
          onClick={onAddBudget ? onAddBudget : () => onViewChange("budget")}
          className="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 text-white text-xs sm:text-sm h-10 sm:h-11 rounded-xl shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Main navigation menu */}
      <nav className="flex-1 px-4 sm:px-6 min-h-0">
        <div className="space-y-1 sm:space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={item.isActive ? "default" : "ghost"}
              className={`w-full justify-start text-xs sm:text-sm h-8 sm:h-10 ${
                item.isActive ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onViewChange(item.id as "dashboard" | "transactions" | "budget" | "settings")}
            >
              <item.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Account summary card - shows current balance */}
      <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Total Balance</span>
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900 truncate">₹1,25,750</div>
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-1 sm:px-2">
                +12.5%
              </Badge>
              <span className="text-xs text-gray-600 truncate">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User profile section */}
      <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-orange-100 text-orange-600 text-xs sm:text-sm">A</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">Akash</div>
            <div className="text-xs text-gray-600 truncate">akash@example.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
