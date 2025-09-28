import { createFileRoute } from "@tanstack/react-router";
import BestSellers from "@/components/BestSellers";
import ProductSearch from "@/components/ProductSearch";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <ProductSearch />
      <BestSellers />
    </>
  );
}
