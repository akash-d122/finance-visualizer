// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"

// This API route handles all CRUD operations for categories.
// Each handler is wrapped in a try/catch for robust error handling.
// You could extend this with color customization or category archiving.

// NOTE: For assignment/demo use, this API will return dummy data if MONGODB_URI is not set.
const dummyCategories = [
  { name: "Food & Dining", value: 8500, color: "#ff6b6b", key: "food" },
  { name: "Transportation", value: 3200, color: "#4ecdc4", key: "transport" },
  { name: "Entertainment", value: 1200, color: "#45b7d1", key: "entertainment" },
  { name: "Utilities", value: 2800, color: "#96ceb4", key: "utilities" },
  { name: "Shopping", value: 1800, color: "#feca57", key: "shopping" },
  { name: "Healthcare", value: 800, color: "#ff9ff3", key: "healthcare" },
]

export async function GET(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    // No DB? No problem! Return dummy data for assignment/demo.
    return NextResponse.json({ categories: dummyCategories })
  }
  await connectToDatabase()
  const { Category } = await import("@/lib/models/Category")
  try {
    const categories = await Category.find().sort({ name: 1 })
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "POST not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Category } = await import("@/lib/models/Category")
  try {
    const body = await req.json()
    // You could add more validation here for production
    const category = await Category.create(body)
    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category." }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "PUT not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Category } = await import("@/lib/models/Category")
  try {
    const { _id, ...update } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Category ID is required for update." }, { status: 400 })
    }
    const category = await Category.findByIdAndUpdate(_id, update, { new: true })
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 })
    }
    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category." }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "DELETE not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Category } = await import("@/lib/models/Category")
  try {
    const { _id } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Category ID is required for deletion." }, { status: 400 })
    }
    const category = await Category.findByIdAndDelete(_id)
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 })
    }
    return NextResponse.json({ message: "Category deleted." })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category." }, { status: 400 })
  }
} 