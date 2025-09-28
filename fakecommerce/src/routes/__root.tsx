import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const RootLayout = () => (
  <div className="container mx-auto mt-6">
    <header>
      <Link to="/">
        <Logo />
      </Link>
    </header>
    <main className="py-16 h-dvh">
      <Outlet />
    </main>
    <footer>
      <Footer />
    </footer>
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
