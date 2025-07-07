"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter } from "lucide-react"
import { useMemo, useCallback } from "react"

interface DashboardFiltersProps {
  dateRange: string
  onDateRangeChange: (value: string) => void
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
}

export function DashboardFilters({
  dateRange,
  onDateRangeChange,
  categoryFilter,
  onCategoryFilterChange,
}: DashboardFiltersProps) {
  // Memoize filter options to avoid unnecessary re-renders
  const dateOptions = useMemo(() => [
    { value: "this-month", label: "This Month" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "this-year", label: "This Year" },
  ], [])
  const categoryOptions = useMemo(() => [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "utilities", label: "Utilities" },
    { value: "shopping", label: "Shopping" },
    { value: "healthcare", label: "Healthcare" },
  ], [])
  // Memoize handlers for performance
  const handleDateChange = useCallback(onDateRangeChange, [onDateRangeChange])
  const handleCategoryChange = useCallback(onCategoryFilterChange, [onCategoryFilterChange])

  return (
    <Card
      className="bg-white border border-gray-200 shadow-md hover:shadow-xl rounded-xl mx-2 sm:mx-0"
    >
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 sm:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Filter className="w-4 h-4 text-orange-600" />
            </div>
            <span>Filters</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <Select value={dateRange} onValueChange={handleDateChange}>
                <SelectTrigger
                  className="flex-1 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 
                  text-sm font-medium rounded-xl h-12 hover:shadow-md transition-all duration-200
                  focus:ring-2 focus:ring-orange-200"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {dateOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="rounded-lg">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger
                  className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 
                  text-sm font-medium rounded-xl h-12 hover:shadow-md transition-all duration-200
                  focus:ring-2 focus:ring-blue-200"
                >
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {categoryOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="rounded-lg">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Filter className="w-5 h-5 text-orange-600" />
            </div>
            <span>Filters:</span>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <Select value={dateRange} onValueChange={handleDateChange}>
                <SelectTrigger
                  className="w-44 bg-gray-50 border-gray-200 text-sm rounded-xl h-11
                  hover:bg-white hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-orange-200"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {dateOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="rounded-lg">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger
                className="w-44 bg-gray-50 border-gray-200 text-sm rounded-xl h-11
                hover:bg-white hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-200"
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-xl">
                {categoryOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value} className="rounded-lg">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
