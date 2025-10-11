import { createFileRoute, Link } from "@tanstack/react-router";
import BestSellers from "@/ui/components/TopProducts";
import ProductSearch from "@/ui/components/ProductSearch";
import getCategories from "@/api/getCategories";
import Spinner from "@/ui/components/Spinner";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(import.meta.env.VITE_CATEGORIES),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
      <Link
        to="/products/all"
        className="text-white bg-black uppercase block text-center text-2xl py-4"
      >
        Show me all
      </Link>
      <BestSellers />
      <h2 className="font-extrabold text-2xl mt-16">Categories:</h2>
      {isPending && <Spinner />}
      {error && (
        <p className="text-center text-lg">
          <span className="font-bold">An error has occurred:</span>{" "}
          {error.message}
        </p>
      )}
      <nav>
        <ul className="flex flex-wrap gap-6 w-full mt-8">
          {data?.map((category, indx) => (
            <Link
              to="/products/$category"
              params={{ category: category.slug }}
              key={indx}
              className="bg-black text-white py-4 px-6 text-lg"
            >
              {category.name}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
}
