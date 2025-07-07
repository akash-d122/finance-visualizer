// lib/models/Category.ts

import mongoose, { Schema, Document, models, model } from "mongoose"

// Category schema for organizing transactions
// Each category can be used to group expenses or income
export interface ICategory extends Document {
  name: string
  type: "income" | "expense" | "other"
  color?: string // Optional: for custom category colors
  createdAt?: Date
  updatedAt?: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "other"],
      required: true,
      default: "expense",
    },
    color: {
      type: String,
      default: "#FFA500", // Orange as a friendly default
    },
  },
  {
    timestamps: true,
  }
)

// Prevent model overwrite in dev (hot reload)
export const Category =
  models.Category || model<ICategory>("Category", CategorySchema) 