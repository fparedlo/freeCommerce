import getAllProducts from "@/utils/getAllProducts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$productSku")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productSku } = Route.useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["all-products", productSku],
    queryFn: getAllProducts,
    staleTime: 15 * 60 * 1000,
  });

  const productData = data?.find((p) => p.sku === productSku);

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="mt-16">
      {!productData ? (
        <h1 className="text-3xl font-bold">Product not Found</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{productData.title}</h1>
          <div className="lg:w-2/3 overflow-x-scroll flex gap-5 pb-4">
            {productData.images.map((img, i) => 
              <img src={img} key={i} alt="" loading="lazy" className="w-full inline-block" />
            )}
          </div>
          
        </>
      )}
    </section>
  );
}
