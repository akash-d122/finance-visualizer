// app/api/budgets/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Budget } from "@/lib/models/Budget"

// This API route handles all CRUD operations for budgets.
// Each handler is wrapped in a try/catch for robust error handling.
// You could extend this with budget alerts or recurring budgets.

export async function GET(req: NextRequest) {
  await connectToDatabase()
  try {
    // Optionally, you could add query params for filtering by period or category
    const budgets = await Budget.find().sort({ period: -1 })
    return NextResponse.json({ budgets })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase()
  try {
    const body = await req.json()
    // You could add more validation here for production
    const budget = await Budget.create(body)
    return NextResponse.json({ budget }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create budget." }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  await connectToDatabase()
  try {
    const { _id, ...update } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Budget ID is required for update." }, { status: 400 })
    }
    const budget = await Budget.findByIdAndUpdate(_id, update, { new: true })
    if (!budget) {
      return NextResponse.json({ error: "Budget not found." }, { status: 404 })
    }
    return NextResponse.json({ budget })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budget." }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase()
  try {
    const { _id } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Budget ID is required for deletion." }, { status: 400 })
    }
    const budget = await Budget.findByIdAndDelete(_id)
    if (!budget) {
      return NextResponse.json({ error: "Budget not found." }, { status: 404 })
    }
    return NextResponse.json({ message: "Budget deleted." })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete budget." }, { status: 400 })
  }
} 