import {
  ProductCard,
  ProductSearch,
  Spinner,
  ErrorInfo,
  LinkButton,
  ProductFilters,
} from "@/ui/components";
import { getProducts, type SortOption } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/products/search")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
      sortBy: (search.sortBy as SortOption) || "name",
      minRating: Number(search.minRating) || 0,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/products/search" });
  const search = Route.useSearch();

  const { isPending, error, data } = useQuery({
    queryKey: ["search-products", search],
    queryFn: () =>
      getProducts({
        search: search.q,
        sortBy: search.sortBy,
        minRating: search.minRating,
      }),
    staleTime: 15 * 60 * 1000,
  });

  const updateSearch = (updates: Partial<typeof search>) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates }),
    });
  };

  return (
    <>
      <ProductSearch />

      <ProductFilters
        sortBy={search.sortBy}
        minRating={search.minRating}
        onSortChange={(sortBy) => updateSearch({ sortBy })}
        onMinRatingChange={(minRating) => updateSearch({ minRating })}
        onClearFilters={() => updateSearch({ minRating: 0 })}
      />

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
