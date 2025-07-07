// app/api/transactions/route.ts

import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { Transaction } from "@/lib/models/Transaction"

// This API route handles all CRUD operations for transactions.
// Each handler is wrapped in a try/catch for robust error handling.
// If you want to extend this, consider adding authentication or pagination.

// NOTE: For assignment/demo use, this API will return dummy data if MONGODB_URI is not set.
const dummyTransactions = [
  {
    id: 1,
    name: "Swiggy Food Order",
    date: "Apr 22, 2025",
    amount: "₹450.00",
    time: "10:00 AM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: 2,
    name: "Netflix Subscription",
    date: "Mar 21, 2025",
    amount: "₹199.00",
    time: "2:30 PM",
    account: "HDFC 7834",
    status: "Success",
    type: "expense",
    category: "Entertainment",
  },
  {
    id: 3,
    name: "Salary Credit",
    date: "Feb 20, 2025",
    amount: "₹45,000.00",
    time: "9:00 AM",
    account: "SBI 1234",
    status: "Success",
    type: "income",
    category: "Income",
  },
  {
    id: 4,
    name: "Big Bazaar",
    date: "Jan 19, 2025",
    amount: "₹1,250.00",
    time: "6:45 PM",
    account: "HDFC 7834",
    status: "Pending",
    type: "expense",
    category: "Groceries",
  },
]

export async function GET(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    // No DB? No problem! Return dummy data for assignment/demo.
    return NextResponse.json({ transactions: dummyTransactions })
  }
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
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "POST not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
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
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "PUT not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
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
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "DELETE not available in demo mode. Add MONGODB_URI for full functionality." }, { status: 501 })
  }
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