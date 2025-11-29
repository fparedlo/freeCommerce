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

interface SearchParams {
  q: string;
}

function RouteComponent() {
  const search: SearchParams = Route.useSearch();

  const { isPending, error, data } = useQuery({
    queryKey: ["search-products", search.q],
    queryFn: () => getProducts({ search: search.q }),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      {data?.length === 0 ? (
        <p className="text-center text-2xl mt-4 font-light">
          <span className="font-bold">No products found for this search:</span>{" "}
          {search.q}
        </p>
      ) : (
        <>
          <h1 className="font-extrabold text-2xl mt-4 mb-8">
            Search results for: <span className="font-light">{search.q}</span>
          </h1>
          <ul className="flex flex-wrap gap-10 w-full group is-plp">
            {data?.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </ul>
        </>
      )}

      <LinkButton
        url="/products/all"
        text="Show all products"
        extraClasses="mt-16"
      />
    </>
  );
}
