import Spinner from "@/ui/components/Spinner";
import getProducts from "@/api/products/getProducts";
import previousPrice from "@/utils/previousPrice";
import priceFormat from "@/utils/priceFormat";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { BasketItem } from "@/types";
import { useBasketStore } from "@/stores/basketStore";

export const Route = createFileRoute("/product/$productSku")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productSku } = Route.useParams();
  const { addItem } = useBasketStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts(import.meta.env.VITE_ALL_PRODUCTS),
    staleTime: 15 * 60 * 1000,
  });

  const productData = useMemo(
    () => data?.find((p) => p.sku === productSku),
    [data, productSku],
  );

  const addToBasket = (formData: FormData) => {
    const rawProductData = formData.get("product");
    const productData = JSON.parse(rawProductData as string);
    const { sku, title, thumbnail, price } = productData;
    const data: BasketItem = {
      sku,
      title,
      thumbnail,
      price,
      transitionId: crypto.randomUUID(),
    };
    addItem(data);
  };

  const rating = (r: number) => {
    return "⭐".repeat(r);
  };

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
          <div className="lg:border-l-2 md:pt-10 md:pl-10 border-dashed">
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
            <form action={addToBasket}>
              <input
                type="hidden"
                name="product"
                value={JSON.stringify({
                  sku: productData.sku,
                  title: productData.title,
                  thumbnail: productData.thumbnail,
                  price: productData.price,
                })}
              />
              <button
                className="mt-4 uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800"
                type="submit"
              >
                Add to Basket
              </button>
            </form>
            <h2 className="mt-8 font-bold text-xl">Reviews:</h2>
            {productData.reviews.map((review) => (
              <article
                key={review.reviewerEmail}
                className="mt-6 border-t pt-4"
              >
                <header className="">
                  {review.reviewerName} - {rating(review.rating)}
                </header>
                <p className="mt-4 italic text-2xl font-light">
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
