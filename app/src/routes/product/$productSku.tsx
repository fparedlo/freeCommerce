import { Button, Spinner, ErrorInfo } from "@/ui/components";
import { getProducts } from "@/api/products";
import { previousPrice, priceFormat } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import type { BasketItem } from "@/types";
import { useBasketStore } from "@/stores/basket";

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
      {error && <ErrorInfo message={error.message} />}
      {productData && (
        <div className="grid lg:grid-cols-2 gap-10">
          <div className=" overflow-x-scroll flex gap-5 pb-4">
            {productData.images.map((img, i) => (
              <img
                src={img}
                key={i}
                alt=""
                fetchPriority="high"
                className="w-full inline-block object-cover"
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
              <Button type="submit" text="Add to Basket" extraClasses="mt-4" />
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
