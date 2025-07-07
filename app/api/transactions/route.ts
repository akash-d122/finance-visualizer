// app/api/transactions/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Transaction } from "@/lib/models/Transaction"

// This API route handles all CRUD operations for transactions.
// Each handler is wrapped in a try/catch for robust error handling.
// If you want to extend this, consider adding authentication or pagination.

export async function GET(req: NextRequest) {
  await connectToDatabase()
  try {
    // Optionally, you could add query params for filtering or pagination
    const transactions = await Transaction.find().sort({ date: -1 })
    return NextResponse.json({ transactions })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions." }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase()
  try {
    const body = await req.json()
    // You could add more validation here for production
    const transaction = await Transaction.create(body)
    return NextResponse.json({ transaction }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction." }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  await connectToDatabase()
  try {
    const { _id, ...update } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Transaction ID is required for update." }, { status: 400 })
    }
    const transaction = await Transaction.findByIdAndUpdate(_id, update, { new: true })
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found." }, { status: 404 })
    }
    return NextResponse.json({ transaction })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update transaction." }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase()
  try {
    const { _id } = await req.json()
    if (!_id) {
      return NextResponse.json({ error: "Transaction ID is required for deletion." }, { status: 400 })
    }
    const transaction = await Transaction.findByIdAndDelete(_id)
    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found." }, { status: 404 })
    }
    return NextResponse.json({ message: "Transaction deleted." })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete transaction." }, { status: 400 })
  }
} 