import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({});

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container mx-auto mt-6 px-4 2xl:px-0 font-roboto">
      <header>
        <Link to="/">
          <Logo />
        </Link>
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="mt-16">
        <Footer />
      </footer>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  </QueryClientProvider>
);

export const Route = createRootRoute({ component: RootLayout });
