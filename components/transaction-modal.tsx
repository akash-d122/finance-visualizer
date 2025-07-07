"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTransaction?: (transaction: any) => void
}

// Transaction form modal - handles adding new transactions
// I designed this to be simple and user-friendly for Stage 1 requirements
export function TransactionModal({ isOpen, onClose, onAddTransaction }: TransactionModalProps) {
  // Form state - keeping it simple with just the essential fields
  const [transactionType, setTransactionType] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  // Handle form submission with basic validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation - could be enhanced with a proper form library
    if (!amount || !description || !transactionType || !category) {
      alert("Please fill in all required fields")
      return
    }
    
    // Process the transaction data
    if (onAddTransaction) {
      onAddTransaction({ type: transactionType, amount, date, description, category })
    }
    
    // Reset form and close modal
    setTransactionType("")
    setAmount("")
    setDate("")
    setDescription("")
    setCategory("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md rounded-2xl shadow-2xl border-0 p-0 overflow-hidden
        animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Modal header with gradient background */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 border-b border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl 
                flex items-center justify-center"
              >
                <span className="text-white text-lg">💳</span>
              </div>
              Add Transaction
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Form content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction type selection */}
            <div className="space-y-3">
              <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                Type *
              </Label>
              <Select value={transactionType} onValueChange={setTransactionType} required>
                <SelectTrigger
                  className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 
                  h-12 text-base hover:shadow-md transition-all duration-300"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="income" className="rounded-lg">
                    Income
                  </SelectItem>
                  <SelectItem value="expense" className="rounded-lg">
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount input */}
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                Amount *
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
                min="0"
                step="0.01"
              />
            </div>

            {/* Date selection */}
            <div className="space-y-3">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 
                  h-12 text-base hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            {/* Description textarea */}
            <div className="space-y-3">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Enter transaction description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 resize-none
                  text-base hover:shadow-md transition-all duration-300"
                required
              />
            </div>

            {/* Category selection - Stage 2 feature restored! */}
            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                Category *
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger
                  className="rounded-xl border-gray-200 focus:border-orange-300 focus:ring-orange-200 \
                  h-12 text-base hover:shadow-md transition-all duration-300"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="Food & Dining" className="rounded-lg">Food & Dining</SelectItem>
                  <SelectItem value="Transportation" className="rounded-lg">Transportation</SelectItem>
                  <SelectItem value="Entertainment" className="rounded-lg">Entertainment</SelectItem>
                  <SelectItem value="Utilities" className="rounded-lg">Utilities</SelectItem>
                  <SelectItem value="Shopping" className="rounded-lg">Shopping</SelectItem>
                  <SelectItem value="Healthcare" className="rounded-lg">Healthcare</SelectItem>
                  <SelectItem value="Income" className="rounded-lg">Income</SelectItem>
                  <SelectItem value="Freelance" className="rounded-lg">Freelance</SelectItem>
                  <SelectItem value="Other" className="rounded-lg">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form actions */}
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
                Add Transaction
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
