"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationsDropdown } from "./notifications-dropdown"
import { ProfileDropdown } from "./profile-dropdown"

interface MobileHeaderProps {
  onMenuClick: () => void
  currentView: string
  onNavigate?: (page: string) => void
}

// Mobile header component - provides navigation on smaller screens
// I designed this to be clean and functional, with just the essentials
export function MobileHeader({ onMenuClick, currentView, onNavigate }: MobileHeaderProps) {
  // Get the appropriate page title for the current view
  const getPageTitle = (view: string) => {
    switch (view) {
      case "transactions":
        return "Transactions"
      // STAGE 2 FEATURE COMMENTED OUT - Budget and Settings removed
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="h-8 w-8 hover:bg-gray-100">
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="text-sm font-medium text-gray-900">{getPageTitle(currentView)}</div>
      </div>

      <div className="flex items-center gap-2">
        <NotificationsDropdown />
        <ProfileDropdown onNavigate={onNavigate} />
      </div>
    </header>
  )
}
