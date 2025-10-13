import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductCard, ProductSearch, Spinner } from "@/ui/components";
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
      {error && (
        <p className="text-center text-lg">
          <span className="font-bold">An error has occurred:</span>{" "}
          {error.message}
        </p>
      )}
      <ul className="flex flex-wrap gap-10 w-full group is-plp">
        {data?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
    </>
  );
}
