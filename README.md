# Personal Finance Visualizer

Hey there! I'm **Akash Duddekunta**, an MCA student at Madanapalle Institute of Technology and Sciences. I built this Personal Finance Visualizer as a portfolio project to showcase my full-stack development skills.

## About This Project

I've always been interested in personal finance and wanted to create something that could help people track their spending habits. This app is my take on a clean, user-friendly finance tracker that focuses on the essentials - adding transactions and visualizing spending patterns.

The project demonstrates my skills with modern web technologies and my approach to building scalable, user-focused applications. I chose to keep it simple for this version, focusing on core functionality that actually helps users understand their finances.

## What I Built

### Core Features
- **Transaction Management**: Add new transactions with amount, date, and description
- **Transaction List**: View all your transactions in a clean, searchable list
- **Data Visualization**: Monthly expenses chart showing income vs expenses over time
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Technical Implementation
- **Frontend**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts library for data visualization
- **State Management**: React hooks for local state
- **Form Handling**: Custom form validation with user-friendly error messages

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## Project Structure

```
finance-visualizer/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── app-sidebar.tsx   # Navigation sidebar
│   ├── dashboard-overview.tsx # Main dashboard
│   ├── transactions-list.tsx # Transaction management
│   ├── transaction-modal.tsx # Add transaction form
│   └── income-expenses-chart.tsx # Data visualization
├── lib/                  # Utility functions
└── public/              # Static assets
```

## Key Features Explained

### Transaction Management
I designed the transaction form to be simple and intuitive. Users can add transactions with just the essential information - amount, date, and description. The form includes basic validation to ensure data quality.

### Data Visualization
The monthly expenses chart is the heart of the application. It shows income vs expenses over time, helping users understand their spending patterns. I used Recharts for smooth, interactive visualizations.

### Responsive Design
The app works seamlessly across all devices. I used a mobile-first approach with Tailwind CSS, ensuring the interface adapts beautifully to different screen sizes.

### Search Functionality
Users can search through their transactions by name or description. I kept this simple but effective, with real-time filtering and smooth animations.

## Technical Decisions

### Why Next.js?
I chose Next.js for its excellent developer experience, built-in optimizations, and seamless TypeScript support. It's perfect for building modern web applications.

### Why Tailwind CSS?
Tailwind makes styling fast and consistent. Combined with shadcn/ui components, it provides a professional look without the overhead of custom CSS.

### Why Local State?
For this version, I used React's built-in state management. It's simple, effective, and perfect for demonstrating core functionality. In a production app, I'd integrate with a database.

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
I follow modern React and TypeScript best practices:
- Functional components with hooks
- TypeScript for type safety
- Clean, readable code structure
- Meaningful variable and function names

## Browser Support

The app works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

While this version focuses on core functionality, I have ideas for future improvements:
- Database integration for data persistence
- User authentication and accounts
- Budget tracking and alerts
- Advanced analytics and insights
- Data export functionality

## About Me

I'm passionate about building applications that solve real problems. My background includes:
- Full-stack web development
- AI/ML technologies
- React, Next.js, TypeScript
- Python, MySQL, MongoDB
- Building scalable, user-focused applications

This project represents my approach to development - clean, focused, and user-centered. I believe in writing code that's not just functional, but also maintainable and enjoyable to work with.

## License

This project is open source and available under the MIT License.

---

Thanks for checking out my Personal Finance Visualizer! Feel free to reach out if you have any questions or feedback. 