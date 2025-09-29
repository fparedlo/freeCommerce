import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";
import Spinner from "@/components/Spinner";
import getProducts from "@/utils/getProducts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/search")({
  component: RouteComponent,
});

// TODO: add Validation is Zod or Valibot

interface searchParams {
  q: string;
}

function RouteComponent() {
  const search: searchParams = Route.useSearch();

  const { isPending, error, data } = useQuery({
    queryKey: ["search-products", search.q],
    queryFn: () => getProducts(import.meta.env.VITE_SEARCH_PRODUCTS + search.q),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
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
