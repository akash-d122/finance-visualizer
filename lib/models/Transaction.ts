// lib/models/Transaction.ts

import mongoose, { Schema, Document, models, model } from "mongoose"

// Transaction schema for the finance visualizer
// Each transaction represents a single income or expense
export interface ITransaction extends Document {
  type: "income" | "expense"
  amount: number
  date: Date
  description: string
  category: string
  createdAt?: Date
  updatedAt?: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
)

// Prevent model overwrite in dev (hot reload)
export const Transaction =
  models.Transaction || model<ITransaction>("Transaction", TransactionSchema) 