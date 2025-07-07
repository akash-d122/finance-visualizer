// lib/models/Budget.ts

import mongoose, { Schema, Document, models, model } from "mongoose"

// Budget schema for tracking planned vs actual spending
// Each budget is linked to a category and a time period
export interface IBudget extends Document {
  category: string
  amount: number
  period: string // e.g., '2024-07', '2024-Q3', '2024'
  createdAt?: Date
  updatedAt?: Date
}

const BudgetSchema = new Schema<IBudget>(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent model overwrite in dev (hot reload)
export const Budget =
  models.Budget || model<IBudget>("Budget", BudgetSchema) 