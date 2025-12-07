import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ProductsGrid,
  ProductSearch,
  Spinner,
  ErrorInfo,
  ProductFilters,
} from "@/ui/components";
import { getProducts, type SortOption } from "@/api/products";

export const Route = createFileRoute("/products/all")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sortBy: (search.sortBy as SortOption) || "name",
      minRating: Number(search.minRating) || 0,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/products/all" });
  const search = Route.useSearch();

  const { isPending, error, data } = useQuery({
    queryKey: ["all-products", search],
    queryFn: () =>
      getProducts({
        limit: 0,
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
      <h1 className="font-extrabold text-2xl">All Products:</h1>

      <ProductFilters
        sortBy={search.sortBy}
        minRating={search.minRating}
        onSortChange={(sortBy) => updateSearch({ sortBy })}
        onMinRatingChange={(minRating) => updateSearch({ minRating })}
        onClearFilters={() => updateSearch({ minRating: 0 })}
      />

      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      {data && <ProductsGrid data={data} />}
    </>
  );
}
