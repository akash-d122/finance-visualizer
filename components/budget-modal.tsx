"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BudgetModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBudget?: (budget: any) => void
}

export function BudgetModal({ isOpen, onClose, onAddBudget }: BudgetModalProps) {
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [period, setPeriod] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onAddBudget) {
      onAddBudget({ category, amount, period })
    }
    // Reset form fields
    setCategory("")
    setAmount("")
    setPeriod("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md rounded-2xl shadow-2xl border-0 p-0 overflow-hidden
        animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 border-b border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl 
                flex items-center justify-center"
              >
                <span className="text-white text-lg">💰</span>
              </div>
              Set Budget
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 
                  h-12 text-base hover:shadow-md transition-all duration-300"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="Food & Dining" className="rounded-lg">
                    Food & Dining
                  </SelectItem>
                  <SelectItem value="Transportation" className="rounded-lg">
                    Transportation
                  </SelectItem>
                  <SelectItem value="Entertainment" className="rounded-lg">
                    Entertainment
                  </SelectItem>
                  <SelectItem value="Utilities" className="rounded-lg">
                    Utilities
                  </SelectItem>
                  <SelectItem value="Shopping" className="rounded-lg">
                    Shopping
                  </SelectItem>
                  <SelectItem value="Healthcare" className="rounded-lg">
                    Healthcare
                  </SelectItem>
                  <SelectItem value="Education" className="rounded-lg">
                    Education
                  </SelectItem>
                  <SelectItem value="Travel" className="rounded-lg">
                    Travel
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                Budget Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 
                  h-12 text-base hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="period" className="text-sm font-semibold text-gray-700">
                Period
              </Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger
                  className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 
                  h-12 text-base hover:shadow-md transition-all duration-300"
                >
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="Weekly" className="rounded-lg">
                    Weekly
                  </SelectItem>
                  <SelectItem value="Monthly" className="rounded-lg">
                    Monthly
                  </SelectItem>
                  <SelectItem value="Yearly" className="rounded-lg">
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 bg-transparent h-12 font-semibold
                  hover:shadow-md active:scale-95 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 
                  hover:from-orange-600 hover:to-orange-700 h-12 font-semibold
                  hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Set Budget
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
