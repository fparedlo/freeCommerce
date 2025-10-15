import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ProductsGrid,
  ProductSearch,
  Spinner,
  ErrorInfo,
} from "@/ui/components";
import { getProducts } from "@/api/products";

export const Route = createFileRoute("/products/all")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts(import.meta.env.VITE_ALL_PRODUCTS),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
      <h1 className="font-extrabold text-2xl">All Products:</h1>
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      {data && <ProductsGrid data={data} />}
    </>
  );
}
