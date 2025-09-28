import { createFileRoute, Link } from "@tanstack/react-router";
import BestSellers from "@/components/TopProducts";
import ProductSearch from "@/components/ProductSearch";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <ProductSearch />
      <Link
        to="/products/all"
        className="text-white bg-black uppercase block text-center text-2xl py-4"
      >
        Show me all
      </Link>
      <BestSellers />
    </>
  );
}
