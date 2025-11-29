import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { ProductCard, Spinner, ErrorInfo } from "@/ui/components";

export function BestSellers() {
  const { isPending, error, data } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => getProducts({ limit: 10 }),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <div className="mt-12">
      <h2 className="font-extrabold text-2xl">Top 10 Products:</h2>
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error?.message} />}
      <ul className="flex flex-nowrap gap-10 w-full overflow-x-auto scroll-smooth pb-4 group is-carousel">
        {data?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
    </div>
  );
}
