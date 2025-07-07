"use client"

import { NotificationsDropdown } from "./notifications-dropdown"
import { SearchBar } from "./search-bar"
import { ProfileDropdown } from "./profile-dropdown"

interface DashboardHeaderProps {
  currentView: string
  onNavigate?: (page: string) => void
}

// Desktop header component - provides navigation and search on larger screens
// I kept this clean and functional, focusing on the core features for Stage 1
export function DashboardHeader({ currentView, onNavigate }: DashboardHeaderProps) {
  // Get the appropriate page title for the current view
  const getPageTitle = (view: string) => {
    switch (view) {
      case "transactions":
        return "Transactions"
      case "budget":
        return "Budget"
      case "settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">{getPageTitle(currentView)}</div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <SearchBar className="w-48 sm:w-64 lg:w-80" />

          <NotificationsDropdown />

          <ProfileDropdown onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  )
}
