"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

const transactions = [
  {
    id: 1,
    name: "Swiggy Food Order",
    date: "Aug 22, 2024",
    amount: "₹450.00",
    time: "10:00 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    date: "Aug 21, 2024",
    amount: "₹199.00",
    time: "2:30 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Entertainment",
  },
  {
    id: 3,
    name: "Salary Credit",
    date: "Aug 20, 2024",
    amount: "₹45,000.00",
    time: "9:00 AM",
    account: "SBI 1234",
    status: "Success",
    type: "income",
    category: "Income",
  },
  {
    id: 4,
    name: "Big Bazaar",
    date: "Aug 19, 2024",
    amount: "₹1,250.00",
    time: "6:45 PM",
    account: "HDFC 7834",
    status: "Pending",
    type: "expense",
    category: "Groceries",
  },
]

interface RecentTransactionsProps {
  onAddTransaction: () => void
}

export function RecentTransactions({ onAddTransaction }: RecentTransactionsProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 w-full sm:w-48 lg:w-64 bg-gray-50 border-gray-200 focus:bg-white text-sm"
              />
            </div>
            <Button
              onClick={onAddTransaction}
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex-shrink-0 text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 lg:px-6">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Transaction</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Date</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Amount</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Time</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Account</th>
                <th className="text-left py-3 px-2 font-medium text-gray-600 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">{transaction.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 block truncate">{transaction.name}</span>
                        <span className="text-xs text-gray-500">{transaction.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-gray-600 text-sm">{transaction.date}</td>
                  <td className="py-4 px-2">
                    <span
                      className={`font-medium text-sm ${
                        transaction.type === "income" ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : ""}
                      {transaction.amount}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-gray-600 text-sm">{transaction.time}</td>
                  <td className="py-4 px-2 text-gray-600 text-sm">{transaction.account}</td>
                  <td className="py-4 px-2">
                    <Badge
                      variant={transaction.status === "Success" ? "default" : "secondary"}
                      className={
                        transaction.status === "Success"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Stacked List View */}
        <div className="lg:hidden space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Header with avatar, name, and status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">{transaction.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{transaction.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{transaction.category}</div>
                  </div>
                </div>
                <Badge
                  variant={transaction.status === "Success" ? "default" : "secondary"}
                  className={`text-xs flex-shrink-0 ${
                    transaction.status === "Success"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }`}
                >
                  {transaction.status}
                </Badge>
              </div>

              {/* Details row */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <div className="text-gray-600 text-xs sm:text-sm">{transaction.date}</div>
                  <div className="text-gray-500 text-xs">{transaction.account}</div>
                </div>
                <div
                  className={`font-semibold text-sm sm:text-base ${
                    transaction.type === "income" ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {transaction.type === "income" ? "+" : ""}
                  {transaction.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
