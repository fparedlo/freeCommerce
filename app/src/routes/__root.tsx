import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Logo, Footer, Basket, Login } from "@/ui/components";

const queryClient = new QueryClient({});

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container mx-auto mt-6 px-4 2xl:px-0 font-roboto min-w-[375px]">
      {/* TODO: sort view in small screens */}
      <header className="grid grid-cols-[1fr_auto_auto] items-center">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Login />
        <Basket />
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
