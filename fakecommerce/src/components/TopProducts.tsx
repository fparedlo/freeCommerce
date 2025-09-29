import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/utils/getProducts";
import Spinner from "./Spinner";

export default function BestSellers() {
  const { isPending, error, data } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => getProducts(import.meta.env.VITE_TOP_PRODUCTS),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <div className="mt-12">
      <h2 className="font-extrabold text-2xl">Top 10 Products:</h2>
      {isPending && <Spinner />}
      {error && (
        <p className="text-center text-lg">
          <span className="font-bold">An error has occurred:</span>{" "}
          {error.message}
        </p>
      )}
      <ul className="flex flex-nowrap gap-10 w-full overflow-x-auto scroll-smooth pb-4 group is-carousel">
        {data?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
    </div>
  );
}
