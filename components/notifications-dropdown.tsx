"use client"

import { useState } from "react"
import { Bell, AlertTriangle, TrendingUp, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const notifications = [
  {
    id: 1,
    title: "Budget Exceeded in Groceries",
    message: "You've spent ₹8,500 out of ₹8,000 budget",
    time: "2 hours ago",
    type: "warning",
    icon: AlertTriangle,
    unread: true,
  },
  {
    id: 2,
    title: "New Transaction Added",
    message: "Swiggy Food Order - ₹450",
    time: "4 hours ago",
    type: "info",
    icon: CreditCard,
    unread: true,
  },
  {
    id: 3,
    title: "Monthly Savings Goal Achieved",
    message: "Congratulations! You've saved ₹15,000 this month",
    time: "1 day ago",
    type: "success",
    icon: TrendingUp,
    unread: false,
  },
  {
    id: 4,
    title: "Salary Credit Received",
    message: "₹45,000 credited to SBI 1234",
    time: "2 days ago",
    type: "info",
    icon: CreditCard,
    unread: false,
  },
  {
    id: 5,
    title: "Budget Alert - Entertainment",
    message: "80% of entertainment budget used",
    time: "3 days ago",
    type: "warning",
    icon: AlertTriangle,
    unread: false,
  },
]

export function NotificationsDropdown() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => n.unread).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "success":
        return "text-green-600 bg-green-100"
      case "info":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="end">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notificationList.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
        ) : (
          notificationList.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${notification.unread ? "bg-blue-50" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`p-2 rounded-full ${getTypeColor(notification.type)} flex-shrink-0`}>
                  <notification.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-gray-900 truncate">{notification.title}</h4>
                    {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 text-center">
          <Button variant="ghost" size="sm" className="w-full text-sm">
            View All Notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
