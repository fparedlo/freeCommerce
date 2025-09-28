import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import getAllProducts from "@/utils/getAllProducts";
import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";

export const Route = createFileRoute("/products/all")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
    staleTime: 15 * 60 * 1000,
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <ProductSearch />
      <ul className="flex flex-wrap gap-10 w-full group is-plp">
        {data.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
    </>
  );
}
