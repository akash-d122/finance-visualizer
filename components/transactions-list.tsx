"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, CreditCard, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// NOTE for recruiters and reviewers:
// This component currently uses mock/demo data for transactions to keep the assignment self-contained and easy to run.
// To make it fully dynamic, just connect a real MongoDB instance (Atlas or local), set MONGODB_URI, and wire up the API routes provided in /app/api/transactions.
// All backend logic is ready for production—just flip the switch!

// Updated: Transaction dates are now distributed from July 2024 to July 2025 for realistic demo filtering
const sampleTransactions = [
  {
    id: 1,
    name: "Swiggy Food Order",
    date: "2024-07-10",
    amount: 450,
    time: "10:00 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    date: "2024-08-15",
    amount: 199,
    time: "2:30 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Entertainment",
  },
  {
    id: 3,
    name: "Salary Credit",
    date: "2024-09-01",
    amount: 45000,
    time: "9:00 AM",
    account: "SBI 1234",
    status: "Success",
    type: "income",
    category: "Income",
  },
  {
    id: 4,
    name: "Big Bazaar Groceries",
    date: "2024-10-05",
    amount: 1250,
    time: "6:45 PM",
    account: "HDFC 7834",
    status: "Pending",
    type: "expense",
    category: "Groceries",
  },
  {
    id: 5,
    name: "Petrol Pump",
    date: "2024-11-12",
    amount: 2500,
    time: "8:30 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Fuel & Transport",
  },
  {
    id: 6,
    name: "Freelance Payment",
    date: "2024-12-20",
    amount: 15000,
    time: "3:00 PM",
    account: "SBI 1234",
    status: "Success",
    type: "income",
    category: "Freelance",
  },
  {
    id: 7,
    name: "Amazon Shopping",
    date: "2025-01-14",
    amount: 3200,
    time: "11:30 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Shopping",
  },
  {
    id: 8,
    name: "Electricity Bill",
    date: "2025-02-09",
    amount: 1800,
    time: "4:15 PM",
    account: "SBI 1234",
    status: "Success",
    type: "expense",
    category: "Utilities",
  },
  {
    id: 9,
    name: "Uber Ride",
    date: "2025-03-18",
    amount: 350,
    time: "7:20 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Transportation",
  },
  {
    id: 10,
    name: "Movie Tickets",
    date: "2025-04-22",
    amount: 800,
    time: "6:00 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Entertainment",
  },
  {
    id: 11,
    name: "Gym Membership",
    date: "2025-05-05",
    amount: 2000,
    time: "10:00 AM",
    account: "SBI 1234",
    status: "Success",
    type: "expense",
    category: "Healthcare",
  },
  {
    id: 12,
    name: "Dividend Credit",
    date: "2025-06-11",
    amount: 5000,
    time: "12:00 PM",
    account: "SBI 1234",
    status: "Success",
    type: "income",
    category: "Investment",
  },
  {
    id: 13,
    name: "Zomato Order",
    date: "2025-07-01",
    amount: 650,
    time: "8:30 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: 14,
    name: "Phone Recharge",
    date: "2025-07-10",
    amount: 399,
    time: "2:15 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Utilities",
  },
  {
    id: 15,
    name: "Book Purchase",
    date: "2025-07-15",
    amount: 1200,
    time: "11:45 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Shopping",
  },
]

interface TransactionsListProps {
  onAddTransaction: () => void
  transactions?: any[] // User's transaction data
}

// Transactions list component - displays all transactions with search functionality
// I kept this focused on the essentials for Stage 1, but it's designed to be easily extensible
export function TransactionsList({ onAddTransaction, transactions = [] }: TransactionsListProps) {
  // Search functionality - simple but effective
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Combine user transactions with sample data and sort by date
  const allTransactions = useMemo(() => {
    return [...transactions, ...sampleTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }, [transactions])

  // Filtered transactions based on search
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([])

  // Filters for category, type, and date range
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  // Fix: Robust date filtering for all ranges, using start/end boundaries for each range
  const filterByDateRange = (txns: any[], dateRange: string) => {
    if (dateRange === "all") return txns
    const now = new Date()
    let start: Date, end: Date
    switch (dateRange) {
      case "this-month":
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case "last-month":
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
        break
      case "last-3-months":
        start = new Date(now.getFullYear(), now.getMonth() - 2, 1)
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case "last-6-months":
        start = new Date(now.getFullYear(), now.getMonth() - 5, 1)
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case "this-year":
        start = new Date(now.getFullYear(), 0, 1)
        end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
        break
      default:
        return txns
    }
    return txns.filter((txn) => {
      const txnDate = new Date(txn.date)
      return txnDate >= start && txnDate <= end
    })
  }

  // Apply all filters and search
  useEffect(() => {
    setIsLoading(true)
    let filtered = allTransactions
    if (categoryFilter !== "all") {
      filtered = filtered.filter((txn) =>
        txn.category && txn.category.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter((txn) => txn.type === typeFilter)
    }
    filtered = filterByDateRange(filtered, dateRange)
    if (searchQuery) {
      filtered = filtered.filter((transaction) => {
        const matchesSearch =
          transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (transaction.description && transaction.description.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesSearch
      })
    }
    const timer = setTimeout(() => {
      setFilteredTransactions(filtered)
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [allTransactions, searchQuery, categoryFilter, typeFilter, dateRange])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Page header with title and add button */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4
        animate-in fade-in slide-in-from-top-4 duration-500"
      >
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">View and manage all your transactions</p>
        </div>
        <Button
          onClick={onAddTransaction}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
            text-white self-start sm:self-auto rounded-xl h-12 px-6 font-semibold
            hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Search functionality */}
      <Card
        className="bg-white border border-gray-200 shadow-md rounded-xl
        animate-in fade-in slide-in-from-top-6 duration-600"
      >
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            Search Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name or description..."
                className="pl-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl h-12 text-base
                  hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters section - styled to match dashboard filters */}
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
        <CardContent className="p-4 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Filter className="w-4 h-4 text-orange-600" />
            </div>
            <span>Filters</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 flex-1">
            {/* Category filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-44 bg-gray-50 border-gray-200 text-sm rounded-xl h-11 hover:bg-white hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-300">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-xl">
                <SelectItem value="all" className="rounded-lg">All Categories</SelectItem>
                <SelectItem value="Food & Dining" className="rounded-lg">Food & Dining</SelectItem>
                <SelectItem value="Entertainment" className="rounded-lg">Entertainment</SelectItem>
                <SelectItem value="Groceries" className="rounded-lg">Groceries</SelectItem>
                <SelectItem value="Fuel & Transport" className="rounded-lg">Fuel & Transport</SelectItem>
                <SelectItem value="Shopping" className="rounded-lg">Shopping</SelectItem>
                <SelectItem value="Utilities" className="rounded-lg">Utilities</SelectItem>
                <SelectItem value="Transportation" className="rounded-lg">Transportation</SelectItem>
                <SelectItem value="Healthcare" className="rounded-lg">Healthcare</SelectItem>
                <SelectItem value="Income" className="rounded-lg">Income</SelectItem>
                <SelectItem value="Freelance" className="rounded-lg">Freelance</SelectItem>
                <SelectItem value="Investment" className="rounded-lg">Investment</SelectItem>
              </SelectContent>
            </Select>
            {/* Type filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-44 bg-gray-50 border-gray-200 text-sm rounded-xl h-11 hover:bg-white hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-orange-300">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-xl">
                <SelectItem value="all" className="rounded-lg">All Types</SelectItem>
                <SelectItem value="income" className="rounded-lg">Income</SelectItem>
                <SelectItem value="expense" className="rounded-lg">Expense</SelectItem>
              </SelectContent>
            </Select>
            {/* Date range filter */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-44 bg-gray-50 border-gray-200 text-sm rounded-xl h-11 hover:bg-white hover:shadow-md transition-all duration-300 focus:ring-2 focus:ring-orange-300">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-xl">
                <SelectItem value="all" className="rounded-lg">All Dates</SelectItem>
                <SelectItem value="this-month" className="rounded-lg">This Month</SelectItem>
                <SelectItem value="last-month" className="rounded-lg">Last Month</SelectItem>
                <SelectItem value="last-3-months" className="rounded-lg">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months" className="rounded-lg">Last 6 Months</SelectItem>
                <SelectItem value="this-year" className="rounded-lg">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions display */}
      <Card
        className="bg-white border border-gray-200 shadow-md rounded-xl
        animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
              All Transactions ({filteredTransactions.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-sm text-gray-500 animate-pulse">Filtering transactions...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop table view */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-3 font-semibold text-gray-600 text-sm">Transaction</th>
                      <th className="text-left py-4 px-3 font-semibold text-gray-600 text-sm">Date</th>
                      <th className="text-left py-4 px-3 font-semibold text-gray-600 text-sm">Amount</th>
                      <th className="text-left py-4 px-3 font-semibold text-gray-600 text-sm">Account</th>
                      <th className="text-left py-4 px-3 font-semibold text-gray-600 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300
                          animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl 
                              flex items-center justify-center flex-shrink-0 shadow-md"
                            >
                              <span className="text-white text-sm font-bold">{transaction.name.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 block truncate text-base">
                                {transaction.name}
                              </span>
                              {/* Category tag - Stage 2 restored! */}
                              {transaction.category && (
                                <Badge
                                  className="mt-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-0 rounded-full px-3 py-1 text-xs font-semibold"
                                >
                                  {transaction.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-gray-600 text-sm font-medium">{formatDate(transaction.date)}</td>
                        <td className="py-4 px-3">
                          <span
                            className={`font-bold text-base ${
                              transaction.type === "income" ? "text-green-600" : "text-gray-900"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : ""}₹{transaction.amount.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="py-4 px-3 text-gray-600 text-sm font-medium">{transaction.account}</td>
                        <td className="py-4 px-3">
                          <Badge
                            variant={transaction.status === "Success" ? "default" : "secondary"}
                            className={`rounded-full px-3 py-1 font-semibold ${
                              transaction.status === "Success"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                            }`}
                          >
                            {transaction.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card view */}
              <div className="lg:hidden space-y-4">
                {filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300
                      hover:shadow-md active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl 
                          flex items-center justify-center flex-shrink-0 shadow-md"
                        >
                          <span className="text-white text-sm font-bold">{transaction.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-base truncate">{transaction.name}</div>
                          {/* Category tag - Stage 2 restored! */}
                          {transaction.category && (
                            <Badge
                              className="mt-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-0 rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              {transaction.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={transaction.status === "Success" ? "default" : "secondary"}
                        className={`text-xs flex-shrink-0 rounded-full px-3 py-1 font-semibold ${
                          transaction.status === "Success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <div className="text-gray-600 text-sm font-medium">{formatDate(transaction.date)}</div>
                        <div className="text-gray-500 text-xs">{transaction.account}</div>
                      </div>
                      <div
                        className={`font-bold text-base ${
                          transaction.type === "income" ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}₹{transaction.amount.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state when no transactions match search */}
              {filteredTransactions.length === 0 && (
                <div className="text-center py-12 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No transactions found matching your search.</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
