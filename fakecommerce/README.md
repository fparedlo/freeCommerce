# FakeCommerce - E-commerce App

A modern e-commerce application built with React, TypeScript, and Vite, using DummyJSON API for product data.

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
- **pnpm** - Package manager

## 📁 Project Structure

```
src/
├── api/           # API layer (products, auth)
├── routes/        # File-based routes
├── stores/        # Zustand stores
├── types/         # TypeScript type definitions
├── ui/            # UI components and styles
├── utils/         # Utility functions
└── main.tsx       # App entry point
```

## 🚧 In Progress / TODO

### Authentication

- Login functionality (UI implemented, integration pending)
- User account management
- Protected routes

### Checkout Process

- Checkout flow implementation
- Order confirmation
- Payment integration

### Testing

- **Unit tests** for utils and stores (because math should work)
- **Component tests** for UI components (buttons need to button)
- **Integration tests** for routes and API calls
- **E2E tests** for critical user flows
- *Sorry for not doing TDD! 🙈 I promise the code works... mostly... probably... please don't break it*

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
```

## 🌐 API Integration

The app uses DummyJSON API with a proxy configuration:

- Base URL: `https://dummyjson.com/`
- Proxy: `/api` routes are proxied to the base URL
- Endpoints: Products, categories, search, authentication

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

```

```
