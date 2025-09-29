import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";
import Spinner from "@/components/Spinner";
import getProducts from "@/utils/getProducts";
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
          <h1 className="font-extrabold text-2xl capitalize">{category.replace("-", " ")}:</h1>
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
