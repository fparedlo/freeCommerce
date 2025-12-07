import { Button, Spinner, ErrorInfo } from "@/ui/components";
import { getProducts } from "@/api/products";
import { previousPrice, priceFormat } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import type { BasketItem } from "@/types";
import { useBasketStore } from "@/stores/basket";
import { useToastStore } from "@/stores/toast";

export const Route = createFileRoute("/product/$productSku")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { productSku } = Route.useParams();
  const { addItem } = useBasketStore();
  const { showToast } = useToastStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getProducts({ limit: 0 }),
    staleTime: 15 * 60 * 1000,
  });

  const productData = useMemo(
    () => data?.find((p) => p.sku === productSku),
    [data, productSku],
  );

  const addToBasket = (formData: FormData) => {
    const rawProductData = formData.get("product");
    if (!rawProductData || typeof rawProductData !== "string") {
      console.error("Invalid product data in addToBasket:", {
        rawProductData,
        type: typeof rawProductData,
      });
      return;
    }
    let productData;
    try {
      productData = JSON.parse(rawProductData);
    } catch (error) {
      console.error("Failed to parse product data:", error);
      return;
    }
    const { sku, title, thumbnail, price } = productData;
    const data: BasketItem = {
      sku,
      title,
      thumbnail,
      price,
      transitionId: crypto.randomUUID(),
    };
    addItem(data);
    showToast("Product added to basket", "success", { title, thumbnail });
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

            <Button
              type="button"
              text={productData.brand}
              extraClasses="px-2! py-0! text-[16px]! normal-case! inline-block! w-auto!"
              action={() =>
                navigate({
                  to: "/products/search",
                  search: {
                    q: productData.brand,
                    sortBy: "name",
                    minRating: 0,
                  },
                })
              }
            />

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
            {productData.reviews.map((review, index) => (
              <article
                key={`${review.reviewerEmail}-${index}`}
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
