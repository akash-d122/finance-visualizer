// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Category } from "@/lib/models/Category"

// This API route handles all CRUD operations for categories.
// Each handler is wrapped in a try/catch for robust error handling.
// You could extend this with color customization or category archiving.

export async function GET(req: NextRequest) {
  await connectToDatabase()
  try {
    const categories = await Category.find().sort({ name: 1 })
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase()
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
  await connectToDatabase()
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
  await connectToDatabase()
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