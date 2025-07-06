"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allTransactions = [
  {
    id: 1,
    name: "Swiggy Food Order",
    amount: "₹450.00",
    date: "Aug 22, 2024",
    category: "Food & Dining",
    account: "HDFC 7834",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    amount: "₹199.00",
    date: "Aug 21, 2024",
    category: "Entertainment",
    account: "HDFC 7834",
  },
  { id: 3, name: "Salary Credit", amount: "₹45,000.00", date: "Aug 20, 2024", category: "Income", account: "SBI 1234" },
  {
    id: 4,
    name: "Big Bazaar Groceries",
    amount: "₹1,250.00",
    date: "Aug 19, 2024",
    category: "Groceries",
    account: "HDFC 7834",
  },
  {
    id: 5,
    name: "Petrol Pump",
    amount: "₹2,500.00",
    date: "Aug 18, 2024",
    category: "Fuel & Transport",
    account: "HDFC 7834",
  },
  {
    id: 6,
    name: "Freelance Payment",
    amount: "₹15,000.00",
    date: "Aug 17, 2024",
    category: "Freelance",
    account: "SBI 1234",
  },
  {
    id: 7,
    name: "Amazon Shopping",
    amount: "₹3,200.00",
    date: "Aug 16, 2024",
    category: "Shopping",
    account: "HDFC 7834",
  },
  {
    id: 8,
    name: "Electricity Bill",
    amount: "₹1,800.00",
    date: "Aug 15, 2024",
    category: "Utilities",
    account: "SBI 1234",
  },
]

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export function SearchBar({ placeholder = "Search transactions...", className = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return allTransactions.filter(
      (transaction) =>
        transaction.name.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.account.toLowerCase().includes(query) ||
        transaction.amount.includes(query),
    )
  }, [searchQuery])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setIsSearchActive(value.length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearchActive(false)
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white text-sm"
        />
        {isSearchActive && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 hover:bg-gray-200"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearchActive && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto shadow-lg">
          <CardContent className="p-2">
            {filteredTransactions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No transactions found for "{searchQuery}"</div>
            ) : (
              <>
                <div className="px-2 py-1 text-xs text-gray-500 font-medium">
                  {filteredTransactions.length} result{filteredTransactions.length !== 1 ? "s" : ""} found
                </div>
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {highlightMatch(transaction.name, searchQuery)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {highlightMatch(transaction.category, searchQuery)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {highlightMatch(transaction.account, searchQuery)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{transaction.date}</div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 ml-2">
                        {highlightMatch(transaction.amount, searchQuery)}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
