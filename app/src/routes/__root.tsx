import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Logo,
  Footer,
  Basket,
  Login,
  Toast,
} from "@/ui/components";
import { me } from "@/api/auth";

const queryClient = new QueryClient({});

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="bg-black text-white px-2 py-1 text-center">
      This is a demo website, no data is collected and no orders are
      processed.
    </div>
    <div className="container mx-auto mt-6 px-4 2xl:px-0 font-roboto min-w-[375px]">
      <header className="grid grid-cols-[1fr_auto_auto] items-center gap-2 sm:gap-4">
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
      <Toast />
    </div>
  </QueryClientProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async () => {
    try {
      const authData = await me();
      return { authData };
    } catch (error) {
      console.error("Auth check failed:", error);
      return { authData: { success: false } };
    }
  },
});
