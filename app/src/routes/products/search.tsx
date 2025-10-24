import {
  ProductCard,
  ProductSearch,
  Spinner,
  ErrorInfo,
  LinkButton,
} from "@/ui/components";
import { getProducts } from "@/api/products";
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
      <h1 className="font-extrabold text-2xl mt-4 mb-8">Search results for: <span className="font-light">{search.q}</span></h1>
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      <ul className="flex flex-wrap gap-10 w-full group is-plp">
        {data?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
      {data?.length === 0 && (
        <p className="text-center text-lg">
          <span className="font-bold">Not products found for this search:</span>{" "}
          {search.q}
        </p>
      )}
      <LinkButton url="/products/all" text="Show me all" extraClasses="mt-20" />
    </>
  );
}
