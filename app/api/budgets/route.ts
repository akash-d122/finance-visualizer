// app/api/budgets/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"

// This API route handles all CRUD operations for budgets.
// Each handler is wrapped in a try/catch for robust error handling.
// You could extend this with budget alerts or recurring budgets.

// NOTE: For assignment/demo use, this API will return dummy data if MONGODB_URI is not set.
const dummyBudgets = [
  {
    id: 1,
    category: "Food & Dining",
    budgeted: 8000,
    spent: 6500,
    remaining: 1500,
    period: "Monthly",
    color: "bg-orange-500",
  },
  {
    id: 2,
    category: "Transportation",
    budgeted: 5000,
    spent: 5200,
    remaining: -200,
    period: "Monthly",
    color: "bg-blue-500",
  },
  {
    id: 3,
    category: "Entertainment",
    budgeted: 3000,
    spent: 1800,
    remaining: 1200,
    period: "Monthly",
    color: "bg-purple-500",
  },
  {
    id: 4,
    category: "Utilities",
    budgeted: 4000,
    spent: 3800,
    remaining: 200,
    period: "Monthly",
    color: "bg-green-500",
  },
]

export async function GET(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    // No DB? No problem! Return dummy data for assignment/demo.
    return NextResponse.json({ budgets: dummyBudgets })
  }
  await connectToDatabase()
  const { Budget } = await import("@/lib/models/Budget")
  try {
    // Optionally, you could add query params for filtering by period or category
    const budgets = await Budget.find().sort({ period: -1 })
    return NextResponse.json({ budgets })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "POST not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Budget } = await import("@/lib/models/Budget")
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
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "PUT not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Budget } = await import("@/lib/models/Budget")
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
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "DELETE not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
  await connectToDatabase()
  const { Budget } = await import("@/lib/models/Budget")
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