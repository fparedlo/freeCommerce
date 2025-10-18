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
- Error handling and user feedback
- Material Symbols icons
- Custom components library

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
│   └── auth/      # Authentication endpoints (login, me)
├── routes/        # File-based routes
│   └── auth/      # Authentication routes (login, my-account)
├── stores/        # Zustand stores
├── types/         # TypeScript type definitions
├── ui/            # UI components and styles
├── utils/         # Utility functions (cookies, date formatting, etc.)
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

```typescript
// src/api/products/getProducts.ts
export async function getProducts(URL: string): Promise<Product[]> {
  // Customize response parsing based on your API structure
  const { data }: { data: Product[] } = await response.json();
  return data;
}
```

3. **Update Type Definitions**: Modify `src/types/index.d.ts` to match your data contracts:

```typescript
export interface Product {
  id: number;
  name: string; // Change from 'title' if needed
  cost: number; // Change from 'price' if needed
  // Add your custom fields
}
```

### Adding New Features

- **New Routes**: Add files to `src/routes/` (auto-generated routing)
- **New API Endpoints**: Create functions in `src/api/`
- **New State**: Add stores in `src/stores/`
- **New Components**: Add to `src/ui/components/`

## 🚧 In Progress / TODO

### Authentication ✅

- **Login functionality** - Complete with form validation and error handling
- **User session management** - HTTPOnly Token and authentication checks
- **Protected routes** - Route guards with automatic redirects
- **Cookie utilities** - Helper functions for cookie management
- **User account management** - Complete profile display with user data ✅

### Checkout Process

- Checkout flow implementation
- Order confirmation
- Payment integration

### Testing

- **Unit tests** for utils and API functions with Vitest ✅
- **Cookie utilities tests** - Testing browser cookie interactions ✅
- **Date formatting tests** - Testing date utility functions ✅
- **Component tests** for UI components (buttons need to button)
- **Integration tests** for routes and API calls
- **E2E tests** for critical user flows
- _Sorry for not doing TDD! 🙈 I promise the code works... mostly... probably... please don't break it_

### Enhancements

- Form validation with Zod/Valibot
- Mobile responsive improvements
- Product filtering and sorting
- Wishlist functionality

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
- `/checkout` - Checkout process (in progress)
- `/checkout/order-confirmation` - Final purchase page

## 🗺️ Development Roadmap

### 🚨 Critical Fixes (Priority 1)

- **Fix Authentication Flow**
  - ✅ Update `my-account.tsx` - remove token parameter from `me()` call
  - Implement logout functionality with proper cookie clearing

- **Complete Missing API Functions**
  - Implement `logout.ts` function
  - Add proper error handling to all API calls

### 🔧 Core Functionality (Priority 2)

- **User Account Management** ✅
  - ✅ Build user profile display in `my-account.tsx`
  - ✅ Add user data fetching and display
  - ✅ Optimize API calls with context passing
  - ✅ Add date formatting utility
  - Implement account settings/preferences

- **Checkout Process**
  - Complete `checkout/index.tsx` with cart summary
  - Add shipping/billing forms
  - Implement `order-confirmation.tsx`

- **Protected Routes**
  - Add authentication guards to checkout routes
  - Implement proper redirect logic

### 🎨 UI/UX Improvements (Priority 3)

- **Form Validation**
  - Add Zod/Valibot for login form
  - Implement checkout form validation
  - Add loading states and error messages

- **Navigation & State**
  - Add user menu/dropdown when logged in
  - Show login/logout states in header
  - Persist basket across sessions

### 🧪 Testing & Quality (Priority 4)

- **Expand Test Coverage**
  - Add tests for auth API functions
  - Test protected route behavior
  - Add integration tests for login flow

- **Error Handling**
  - Add global error boundaries
  - Implement proper API error handling
  - Add network error recovery

### 🚀 Future Enhancements (Priority 5)

- **Advanced Features**
  - Order history in user account
  - Wishlist functionality
  - Product reviews/ratings
  - Search filters and sorting

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