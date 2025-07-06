"use client"

import { useState } from "react"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileDropdownProps {
  onNavigate?: (page: string) => void
}

export function ProfileDropdown({ onNavigate }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "profile":
        console.log("Navigate to profile")
        break
      case "settings":
        onNavigate?.("settings")
        break
      case "logout":
        console.log("Logout user")
        // Add logout logic here
        break
    }
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-orange-100 text-orange-600">A</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium text-gray-900 hidden sm:block">Akash</div>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-orange-100 text-orange-600">A</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">Akash</div>
              <div className="text-sm text-gray-500">akash@example.com</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleMenuClick("profile")} className="cursor-pointer">
          <User className="w-4 h-4 mr-3" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleMenuClick("settings")} className="cursor-pointer">
          <Settings className="w-4 h-4 mr-3" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleMenuClick("logout")} className="cursor-pointer text-red-600">
          <LogOut className="w-4 h-4 mr-3" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
