// lib/mongoose.ts

import mongoose from "mongoose"

// This utility manages the MongoDB connection for the app.
// It uses the MONGODB_URI environment variable for flexibility and security.
//
// If you're running locally, add MONGODB_URI to your .env file.
// Example: MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/finance

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Please set it in your environment variables or .env file."
  )
}

/**
 * Connects to MongoDB using Mongoose.
 * Ensures we only create one connection across hot reloads in development.
 *
 * Usage: import { connectToDatabase } from '@/lib/mongoose'
 *         await connectToDatabase()
 */
export async function connectToDatabase() {
  // If already connected, just return
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }

  // In dev, reuse the global connection to avoid creating many connections on hot reload
  if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongooseConnection) {
      (global as any)._mongooseConnection = mongoose.connect(MONGODB_URI, {
        dbName: "finance-visualizer",
      })
    }
    await (global as any)._mongooseConnection
    return mongoose.connection
  }

  // In production, just connect normally
  await mongoose.connect(MONGODB_URI, {
    dbName: "finance-visualizer",
  })
  return mongoose.connection
} 