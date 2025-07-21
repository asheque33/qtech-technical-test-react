# 🛒 Mini E-Commerce SPA

A modern, responsive e-commerce single-page application built with React, TypeScript, and Tailwind CSS for Qtec Solution Limited technical assessment.

## 🌟 Features

### ✅ Core Functionality
- **Product Listing** - Display products in clean, modern card layout (200px width)
- **Product Details** - Comprehensive product information with image gallery
- **Shopping Cart** - Add, update, remove items with quantity controls
- **Cart Persistence** - Cart data persists across browser sessions
- **Checkout Process** - Modal-based checkout with form validation
- **Responsive Design** - Mobile-first, works on all device sizes

### 🎨 UI/UX Features
- **Dynamic Star Ratings** - Precise rating display (e.g., 4.75 shows 75% filled star)
- **Stock Validation** - Prevents adding more items than available stock
- **Loading States** - Smooth loading animations and error handling
- **Hover Effects** - Interactive product cards with smooth transitions
- **Toast Notifications** - Success/error messages using Sonner

### 🔧 Technical Features
- **TypeScript** - Full type safety throughout the application
- **Context API** - Global state management for cart functionality
- **React Router** - Client-side routing for SPA navigation
- **Local Storage** - Persistent cart data across sessions
- **Error Boundaries** - Graceful error handling and recovery

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development and better IDE support
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling

### Libraries & Tools
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons and UI elements
- **Sonner** - Toast notifications
- **ESLint** - Code linting and quality assurance

### Development
- **Git** - Version control with meaningful commit messages
- **pnpm** - Fast, efficient package manager
- **VS Code** - Development environment with TypeScript support

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/asheque33/qtech-technical-test-react.git
cd qtech-technical-test-react

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartIntegration.tsx
│   ├── CartSidebar.tsx
│   ├── CheckoutModal.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── contexts/           # React Context providers
│   └── CartContext.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   └── ProductDetails.tsx
├── router/             # Routing configuration
│   └── routes.tsx
├── types/              # TypeScript type definitions
│   ├── cart-context.ts
│   └── product.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Assessment Requirements Coverage

### ✅ Frontend Requirements
- [x] **React.js with TypeScript** - Full TypeScript implementation
- [x] **Responsive UI** - Mobile-first design with Tailwind CSS
- [x] **Single Page Application** - React Router for navigation
- [x] **Git Version Control** - Clean commit history
- [x] **Live Demo** - Deployed on [Netlify/Vercel]

### ✅ Pages Implementation
- [x] **Home Page** - Product listing with 6+ dummy products
- [x] **Product Detail Page** - Full product information display
- [x] **Cart Sidebar** - Slide-in cart with quantity controls
- [x] **Checkout Modal** - Form-based checkout process

### ✅ Design Requirements
- [x] **Modern Card Layout** - Clean, professional design
- [x] **200px Product Cards** - Exact width specification
- [x] **Navbar** - Home and Cart navigation links
- [x] **Add to Cart Functionality** - Working cart operations

## 🎨 Design Features

### Product Cards
- **Fixed 200px width** as per requirements
- **Hover animations** and smooth transitions
- **Stock status indicators** and pricing display
- **Responsive grid layout** with auto-fit columns

### Cart System
- **Persistent storage** using localStorage
- **Stock validation** prevents overselling
- **Quantity controls** with min/max limits
- **Real-time totals** and item count display

### User Experience
- **Loading states** for better perceived performance
- **Error handling** with user-friendly messages
- **Toast notifications** for action feedback
- **Responsive design** works on all devices

## 🎯 Key Technical Decisions

### State Management
- **React Context** chosen over Redux for simplicity
- **localStorage** for cart persistence
- **TypeScript interfaces** for type safety

### Styling Approach  
- **Tailwind CSS** for rapid development
- **Responsive-first** design methodology
- **Component-based** styling architecture

### Code Organization
- **Feature-based** folder structure
- **Separation of concerns** between UI and logic
- **Reusable components** for maintainability

## 🐛 Known Issues & Future Improvements

### Potential Enhancements
- [ ] Add search and filtering functionality
- [ ] Implement product categories
- [ ] Add user authentication
- [ ] Include product reviews and ratings
- [ ] Add wishlist functionality
- [ ] Implement real payment integration

## 👤 Author

**Ashequr Rahman**
- GitHub: [@asheque33](https://github.com/asheque33)
- Email: [ashequrrahman3333@gmail.com]

## 🏢 About Qtec Solution Limited

This project was developed as part of the Frontend Developer technical assessment for Qtec Solution Limited. 

**Demo URL**: [[Live Demo Link](https://shopeasy-neon.vercel.app/)]

---
