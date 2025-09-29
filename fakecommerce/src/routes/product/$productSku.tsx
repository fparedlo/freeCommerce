import Spinner from "@/components/Spinner";
import getProducts from "@/utils/getProducts";
import previousPrice from "@/utils/previousPrice";
import priceFormat from "@/utils/priceFormat";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/product/$productSku")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productSku } = Route.useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts(import.meta.env.VITE_ALL_PRODUCTS),
    staleTime: 15 * 60 * 1000,
  });

  const productData = useMemo(
    () => data?.find((p) => p.sku === productSku),
    [data, productSku],
  );

  return (
    <section className="mt-16">
      {isPending && <Spinner />}
      {error && (
        <p className="text-center text-lg">
          <span className="font-bold">An error has occurred:</span>{" "}
          {error.message}
        </p>
      )}
      {productData && (
        <div className="grid lg:grid-cols-2 gap-10">
          <div className=" overflow-x-scroll flex gap-5 pb-4">
            {productData.images.map((img, i) => (
              <img
                src={img}
                key={i}
                alt=""
                fetchPriority="high"
                className="w-full inline-block"
              />
            ))}
          </div>
          <div className="pt-8 lg:pt-0 lg:border-l-2 pl-10 border-dashed">
            <h1 className="text-3xl font-bold">{productData.title}</h1>
            <h2 className="bg-black text-white inline-block px-2">
              {productData.brand}
            </h2>
            <p className="text-lg mt-4">{productData.description}</p>
            <p className="text-2xl mt-4">
              {priceFormat(productData.price)}{" "}
              <span className="font-light">
                (
                  <span className="line-through">
                {priceFormat(
                  previousPrice(
                    productData.price,
                    productData.discountPercentage,
                  ),
                )}
                </span>
                )
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
