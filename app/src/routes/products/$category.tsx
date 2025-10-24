import {
  ErrorInfo,
  ProductsGrid,
  ProductSearch,
  Spinner,
} from "@/ui/components";
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$category")({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useParams();
  const { isPending, error, data } = useQuery({
    queryKey: [category],
    queryFn: () => getProducts(import.meta.env.VITE_CATEGORY_BASE + category),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
      <h1 className="font-extrabold text-2xl capitalize">
        {category.replaceAll("-", " ")}:
      </h1>
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      {data && <ProductsGrid data={data} />}
    </>
  );
}
