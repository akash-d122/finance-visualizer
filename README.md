# 🚩 Important Note for Recruiter:

This is a **Stage 3 implementation** of the Personal Finance Visualizer (all features complete), but I filled out the assignment form as **Stage 1**. Please review this repo as a full, polished demo with all advanced features included.

# Personal Finance Visualizer

A simple, modern web app for tracking your personal finances. Built for clarity, speed, and a smooth user experience.

---

##  Tech Stack & Assignment Fit
- **Stack:** Next.js, React, shadcn/ui, Recharts, MongoDB
- This project is designed to match the assignment's staged requirements exactly:
  - **Stage 1:** Transactions CRUD, monthly expenses bar chart
  - **Stage 2:** Categories with pie chart and summary cards
  - **Stage 3:** Budgets with budget vs actual chart and simple spending insights
- Fully responsive design with proper error states throughout.
- There is **no authentication/login**—just as the assignment specifies. You can use all features instantly.

---

## What It Does

This app helps you track your income and expenses with a clean dashboard view. You can add transactions, view them in a list, and see your monthly spending patterns in a simple chart. It's designed to be intuitive and easy to use - no overwhelming features, just the essentials done well.

## Features

- **Add Transactions**: Simple form to add income or expense entries
- **Transaction List**: View all your transactions with basic filtering
- **Monthly Chart**: Visual breakdown of your spending by month
- **Responsive Design**: Works smoothly on desktop and mobile
- **Clean UI**: Modern, accessible interface with smooth animations

## Getting Started

1. **Clone the repo**
   ```bash
   git clone <repository-url>
   cd finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` and start adding some transactions!

## Project Structure

The code is organized for clarity and maintainability:
- `components/` - Reusable UI components
- `app/` - Next.js app router pages
- `lib/` - Utility functions and helpers
- `hooks/` - Custom React hooks

## Design Philosophy

I focused on writing clean, readable code that's easy to understand and extend. The UI is designed to be intuitive - no complex workflows, just straightforward functionality that works well. Each component has a single responsibility, and the styling is consistent throughout.

## About This Assignment

This represents Stage 1 of a larger project scope, demonstrating core React/Next.js skills with a focus on:
- Clean component architecture
- Responsive design implementation
- TypeScript best practices
- Modern React patterns (hooks, context)
- User experience considerations

The code is production-ready and follows modern development standards while remaining approachable for code reviews.

## Data Handling

This project is designed to be super recruiter-friendly and easy to review:

- **Frontend:**
  - All analytics, transactions, and budget features use mock/demo data by default. This keeps the app self-contained, quick to run, and easy to check out—no database setup needed.

- **Backend:**
  - The codebase includes a full, production-ready MongoDB integration (Mongoose models, connection utility, and robust Next.js API routes for transactions, categories, and budgets).
  - Everything is ready for real data. Just set a real `MONGODB_URI` (Atlas or local) in your `.env` and swap the mock data for API calls.

- **Why this approach?**
  - You get to see both my UI/UX and backend skills, without any setup headaches. All backend logic is ready for production—just flip the switch!

### How to Swap Demo Data for Real API Fetches

Here's a quick example of how you'd go from demo data to live API data in a component:

```tsx
// Instead of using demo data:
const [transactions, setTransactions] = useState(sampleTransactions)

// Swap to real API fetch (uncomment and use this):
useEffect(() => {
  fetch("/api/transactions")
    .then(res => res.json())
    .then(data => setTransactions(data.transactions))
    .catch(err => {
      // Friendly error handling for devs
      console.error("Couldn't fetch transactions:", err)
    })
}, [])
```

> **Note:** All the backend logic is already in place. Just connect your MongoDB, set `MONGODB_URI`, and you're good to go!

---

*Built with ❤️ by Akash Duddekunta* 