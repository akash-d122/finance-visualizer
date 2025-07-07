"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, CreditCard, Wallet } from "lucide-react"

interface CardDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  cardType: string | null
  data: {
    income: number
    expenses: number
    balance: number
  }
  dateRange: string
  categoryFilter: string
}

export function CardDetailsModal({
  isOpen,
  onClose,
  cardType,
  data,
  dateRange,
  categoryFilter,
}: CardDetailsModalProps) {
  if (!cardType) return null

  const getCardDetails = () => {
    switch (cardType) {
      case "income":
        return {
          title: "Income Details",
          icon: DollarSign,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          amount: data.income,
          breakdown: [
            { label: "Salary", amount: Math.round(data.income * 0.75), percentage: 75 },
            { label: "Freelance", amount: Math.round(data.income * 0.15), percentage: 15 },
            { label: "Investments", amount: Math.round(data.income * 0.08), percentage: 8 },
            { label: "Other", amount: Math.round(data.income * 0.02), percentage: 2 },
          ],
          insights: [
            "Your primary income source is salary",
            "Freelance income has increased by 12% this period",
            "Consider diversifying income streams",
          ],
        }
      case "expenses":
        return {
          title: "Expenses Details",
          icon: CreditCard,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          amount: data.expenses,
          breakdown:
            categoryFilter === "all"
              ? [
                  { label: "Food & Dining", amount: Math.round(data.expenses * 0.35), percentage: 35 },
                  { label: "Transportation", amount: Math.round(data.expenses * 0.25), percentage: 25 },
                  { label: "Shopping", amount: Math.round(data.expenses * 0.2), percentage: 20 },
                  { label: "Utilities", amount: Math.round(data.expenses * 0.12), percentage: 12 },
                  { label: "Entertainment", amount: Math.round(data.expenses * 0.08), percentage: 8 },
                ]
              : [
                  {
                    label: `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} - Primary`,
                    amount: Math.round(data.expenses * 0.6),
                    percentage: 60,
                  },
                  {
                    label: `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} - Secondary`,
                    amount: Math.round(data.expenses * 0.25),
                    percentage: 25,
                  },
                  {
                    label: `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} - Other`,
                    amount: Math.round(data.expenses * 0.15),
                    percentage: 15,
                  },
                ],
          insights:
            categoryFilter === "all"
              ? [
                  "Food & Dining is your largest expense category",
                  "Transportation costs are higher than average",
                  "Consider setting category-specific budgets",
                ]
              : [
                  `Showing ${categoryFilter} category expenses only`,
                  `This represents a portion of your total spending`,
                  `Use filters to see complete expense breakdown`,
                ],
        }
      case "balance":
        return {
          title: "Balance Details",
          icon: Wallet,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          amount: data.balance,
          breakdown: [
            { label: "Savings Account", amount: Math.round(data.balance * 0.45), percentage: 45 },
            { label: "Current Account", amount: Math.round(data.balance * 0.3), percentage: 30 },
            { label: "Fixed Deposits", amount: Math.round(data.balance * 0.2), percentage: 20 },
            { label: "Cash", amount: Math.round(data.balance * 0.05), percentage: 5 },
          ],
          insights: [
            "Your balance is well distributed across accounts",
            "Consider increasing FD allocation for better returns",
            "Maintain emergency fund of 6 months expenses",
          ],
        }
      default:
        return null
    }
  }

  const details = getCardDetails()
  if (!details) return null

  const formatDateRange = (range: string) => {
    switch (range) {
      case "this-month":
        return "This Month"
      case "last-month":
        return "Last Month"
      case "last-3-months":
        return "Last 3 Months"
      case "last-6-months":
        return "Last 6 Months"
      case "this-year":
        return "This Year"
      default:
        return "Selected Period"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${details.bgColor} ${details.borderColor} border`}>
              <details.icon className={`w-5 h-5 ${details.color}`} />
            </div>
            <div>
              <div className="text-lg font-semibold">{details.title}</div>
              <div className="text-sm text-gray-500 font-normal">{formatDateRange(dateRange)}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Total Amount */}
          <Card className={`${details.bgColor} ${details.borderColor} border`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{details.amount.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">+12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {details.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${details.color.replace("text-", "bg-")}`}></div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.percentage}%
                    </Badge>
                    <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Filter Info */}
          {categoryFilter !== "all" && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700">Filter Active</Badge>
                  <span className="text-sm text-blue-700">Showing data for "{categoryFilter}" category only</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
