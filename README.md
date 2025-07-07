# Personal Finance Visualizer

A clean, modern web app for tracking personal finances with a focus on simplicity and user experience. Built as a recruitment assignment to demonstrate React/Next.js skills and clean code practices.

## What It Does

This app helps you track your income and expenses with a clean dashboard view. You can add transactions, view them in a list, and see your monthly spending patterns in a simple chart. It's designed to be intuitive and easy to use - no overwhelming features, just the essentials done well.

## Features (Stage 1)

- **Add Transactions**: Simple form to add income or expense entries
- **Transaction List**: View all your transactions with basic filtering
- **Monthly Chart**: Visual breakdown of your spending by month
- **Responsive Design**: Works smoothly on desktop and mobile
- **Clean UI**: Modern, accessible interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **UI Components**: Custom-built with Radix UI primitives
- **Development**: ESLint, Prettier for code quality

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