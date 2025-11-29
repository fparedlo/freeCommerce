import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BestSellers,
  LinkButton,
  ProductSearch,
  Spinner,
  ErrorInfo,
} from "@/ui/components";
import { getCategories } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <>
      <ProductSearch />
      <LinkButton url="/products/all" text="Show me all" />
      <BestSellers />
      <h2 className="font-extrabold text-2xl mt-16">Categories:</h2>
      {isPending && <Spinner />}
      {error && <ErrorInfo message={error.message} />}
      <nav>
        <ul className="flex flex-wrap gap-6 w-full mt-8">
          {data?.map((category) => (
            <Link
              to="/products/$category"
              params={{ category: category.slug }}
              key={category.slug}
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
