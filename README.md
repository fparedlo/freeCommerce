# freeCommerce - E-commerce App

A modern open-source e-commerce application built with React, TypeScript, and Vite, using DummyJSON API for product data.

## 🚀 Features Implemented

### Core Functionality

- **Product Catalog**: Browse all products with pagination
- **Category Navigation**: Filter products by categories
- **Product Search**: Search functionality across all products
- **Product Details**: Individual product pages with images, reviews, and pricing
- **Shopping Basket**: Add/remove items with persistent storage
- **Price Display**: Formatted pricing with discount calculations

### Routing & Navigation

- File-based routing with TanStack Router
- Dynamic routes for products and categories
- Search functionality with URL parameters

### State Management

- Zustand for basket state management
- Persistent storage using localStorage
- React Query for server state and caching

### UI/UX

- Responsive design with Tailwind CSS
- Loading states with spinners
- Toast notification system for user feedback
- Error handling and user feedback
- Material Symbols icons
- Custom components library with enhanced Button component

## 🔧 Tech Stack

### Core Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling framework

### Key Libraries

- **@tanstack/react-router** - File-based routing
- **@tanstack/react-query** - Server state management
- **Zustand** - Client state management
- **Zod** - Schema validation and data safety
- **@vitejs/plugin-react-swc** - Fast refresh with SWC

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vitest** - Unit testing framework
- **pnpm** - Package manager

## 📁 Project Structure

```
src/
├── api/           # API layer (products, auth)
│   ├── auth/      # Authentication endpoints (login, me, logout)
│   └── products/  # Product endpoints (getProducts, etc.)
├── routes/        # File-based routes
│   ├── auth/      # Authentication routes (login, my-account)
│   ├── checkout/  # Checkout routes (index, order-confirmation)
│   ├── product/   # Individual product pages
│   └── products/  # Product listing pages
├── stores/        # Zustand stores
│   ├── basket/    # Shopping basket state
│   ├── order/     # Order state and history
│   ├── toast/     # Toast notification state
│   └── user/      # User state (empty - using context instead)
├── types/         # TypeScript type definitions
├── ui/            # UI components and styles
│   └── components/# Reusable components (Button, Login, Basket, Toast, etc.)
├── utils/         # Utility functions (price, date formatting)
└── main.tsx       # App entry point
```

## 🔧 How It Works & Customization

### Architecture Overview

The app follows a modular architecture with clear separation of concerns:

- **API Layer** (`src/api/`): Handles all external data fetching
- **Routes** (`src/routes/`): File-based routing with TanStack Router
- **Stores** (`src/stores/`): Client-side state management with Zustand
- **Components** (`src/ui/components/`): Reusable UI components
- **Types** (`src/types/`): TypeScript interfaces for type safety

### Customizing API Endpoints

1. **Change Base URL**: Update `vite.config.ts` proxy configuration:

```typescript
proxy: {
  '/api': {
    target: 'https://your-api.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

2. **Update API Functions**: Modify functions in `src/api/` to match your backend:


3. **Update Type Definitions**: Modify `src/types/index.d.ts` to match your data contracts:


### Adding New Features

- **New Routes**: Add files to `src/routes/` (auto-generated routing)
- **New API Endpoints**: Create functions in `src/api/`
- **New State**: Add stores in `src/stores/`
- **New Components**: Add to `src/ui/components/`



## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

## 🌐 API Integration

The app uses DummyJSON API with a proxy configuration:

- Base URL: `https://dummyjson.com/`
- Proxy: `/api` routes are proxied to the base URL
- Endpoints: Products, categories, search, authentication

## 🚀 Deployment

### Netlify

The app is configured for Netlify deployment with:

- **_redirects file**: Handles API proxy and SPA routing in production
- **API Proxy**: `/api/*` routes redirect to `https://dummyjson.com/`
- **SPA Support**: All routes serve `index.html` for client-side routing

## 📱 Routes

- `/` - Homepage with categories and top products
- `/products/all` - All products listing
- `/products/search` - Search results
- `/products/$category` - Category-specific products
- `/product/$productSku` - Individual product details
- `/basket` - Shopping basket
- `/auth/login` - User login
- `/auth/my-account` - User profile
- `/checkout` - Complete 3-step checkout process
- `/checkout/order-confirmation` - Order confirmation with full details

## 🗺️ Development Roadmap

**Overall Completion: ~75%**

### 🚨 Critical Fixes (Priority 1) - 100% COMPLETE ✅

- **Fix Authentication Flow** ✅
  - ✅ Update `my-account.tsx` - remove token parameter from `me()` call
  - ✅ Implement logout functionality (using login with 0 expiry)
  - ✅ Add silent error handling for expected 401s during auth checks

- **Complete Missing API Functions** ✅
  - ✅ Implement `logout.ts` function
  - ✅ Add proper error handling to all API calls

- **Security Enhancements** ✅
  - ✅ Fixed SSRF vulnerabilities in API layer
  - ✅ Refactored `getProducts` and `getCategories` to use structured parameters
  - ✅ Added Zod schema validation for all API responses
  - ✅ Implemented data transformation for Date fields

### 🔧 Core Functionality (Priority 2) - 90% COMPLETE

- **User Account Management** ✅
  - ✅ Build user profile display in `my-account.tsx`
  - ✅ Add user data fetching and display
  - ✅ Optimize API calls with context passing
  - ✅ Add date formatting utility
  - ✅ Global auth context for shared state
  - ✅ Dynamic UI based on auth state (Login component)
  - ✅ Protected routes with beforeLoad guards
  - ❌ Implement account settings/preferences - TODO

- **Checkout Process** ✅ FULLY IMPLEMENTED!
  - ✅ Complete CheckoutForm component with 3-step flow (shipping → payment → review)
  - ✅ Shipping form with Zod validation
  - ✅ Payment form with card validation
  - ✅ Review step before order placement
  - ✅ Order confirmation page with full details
  - ✅ Order store with localStorage persistence
  - ✅ Cart summary display in sidebar
  - ✅ Guest and logged-in user support
  - ✅ Input component for forms
  - ✅ Validation schemas (shipping, billing, payment)

### 🎨 UI/UX Improvements (Priority 3) - 100% COMPLETE ✅

- **Form Validation** ✅
  - ✅ Zod installed and integrated in dependencies
  - ✅ Zod validation for API responses
  - ✅ Enhanced Button component with disabled state
  - ✅ Error messages in all forms
  - ✅ Loading states in components

- **Navigation & State** ✅
  - ✅ Show login/logout states in header (Login component)
  - ✅ Basket persists across sessions (localStorage)
  - ✅ Order history persists in localStorage

- **User Feedback** ✅
  - ✅ Toast notification system implemented with Zustand
  - ✅ Success notifications (green) when adding products to basket
  - ✅ Error notifications (red) when removing products from basket
  - ✅ Auto-dismiss notifications after 3 seconds
  - ✅ Image error handling with fallback placeholders
  - ✅ Enhanced Button component with disabled state support

### 🧪 Testing & Quality (Priority 4) - 60% COMPLETE ⚠️

- **Fix Critical Security Issues** ✅
  - ✅ Implemented CSRF protection in API calls
  - ✅ Zod validation for API responses to prevent malicious data
  - ✅ Improved error handling in auth API calls
  - ✅ Runtime data validation with Zod schemas
  - ❌ Add input sanitization for user inputs - TODO

- **Expand Test Coverage** ⚠️
  - ✅ Unit tests for utility functions (price, date formatting)
  - ❌ Add tests for auth API functions - TODO
  - ❌ Test protected route behavior - TODO
  - ❌ Add integration tests for login flow - TODO
  - ❌ Add component tests - TODO

- **Error Handling & Performance** ✅
  - ✅ Global error boundaries implemented (ErrorFallback, ErrorInfo)
  - ✅ Proper API error handling in auth functions
  - ✅ User-friendly error recovery UI
  - ✅ Development vs production error displays
  - ❌ Review performance in utility functions - TODO
  - ❌ Add network error recovery - TODO

### 🚀 Future Enhancements (Priority 5) - 0% COMPLETE ❌

- ❌ Order history UI in user account (store exists, no display)
- ❌ Wishlist functionality
- ❌ Product reviews/ratings submission (data exists, no form)
- ❌ Search filters and sorting
- ✅ Mobile responsive improvements
- ❌ User menu/dropdown when logged in (shows name only)

### 🔒 Security Best Practices

- Use environment variables for sensitive configuration
- Implement proper CORS policies
- Add rate limiting for API endpoints
- Validate and sanitize all user inputs

_Sorry for not doing TDD! 🙈 I promise the code works... mostly... probably... please don't break it_

## 🤝 Contributing & Collaboration

### We Need Help! 🎨

This is currently a **Proof of Concept** focusing on technology implementation. We're looking for collaborators to help improve:

**Design & UX**

- UI/UX Designer to create a cohesive design system
- Improve visual hierarchy and user experience
- Mobile-first responsive design improvements
- Accessibility enhancements

**Frontend Development**

- Component library expansion
- Animation and micro-interactions
- Performance optimizations
- Advanced filtering and search features

**Backend Integration**

- Real API integration beyond DummyJSON
- Authentication and user management
- Payment processing integration
- Order management system

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `pnpm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

**Contact**: Open an issue to discuss ideas or reach out for collaboration opportunities!