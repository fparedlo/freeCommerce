import { createFileRoute } from "@tanstack/react-router";
import { useToastStore } from "@/stores/toast";
import { useBasketStore } from "@/stores/basket";
import { priceFormat } from "@/utils";
import { Button, LinkButton } from "@/ui/components";
import type { BasketItem } from "@/types";

export const Route = createFileRoute("/basket")({
  component: RouteComponent,
});

function RouteComponent() {
  const { basket, removeItem, totalCost, cleanBasket } = useBasketStore();
  const { showToast } = useToastStore();

  const handleRemove = (product: BasketItem) => {
    removeItem(product);
    showToast("Product removed from basket", "error", {
      title: product.title,
      thumbnail: product.thumbnail,
    });
  };

  return (
    <section className="mt-16">
      {basket.length ? (
        <>
          <h1 className="text-3xl font-bold">Your Basket:</h1>
          <ul>
            {basket.map((product) => (
              <li
                key={product.transitionId}
                className="flex items-center gap-4 py-8 border-b border-neutral-200 first-of-type:border-t first-of-type:mt-12"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="100"
                  height="100"
                />
                <p>{product.title} </p>
                <div className="ml-auto flex gap-5 items-center">
                  <p className="text-lg">{priceFormat(product.price)}</p>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => handleRemove(product)}
                  >
                    <span className="material-symbols-outlined text-4xl!">
                      delete
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right text-lg">
            <p>
              Total number of items: <b>{basket.length}</b>
            </p>
            <p>
              Total basket value: <b>{priceFormat(totalCost())}</b>
            </p>
            <LinkButton
              url="/checkout"
              text="Go to Checkout"
              extraClasses="mt-10"
            ></LinkButton>
            <Button
              type="button"
              text="Clean Basket"
              extraClasses="mt-5"
              action={cleanBasket}
              invert
            ></Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-12 text-center text-6xl">Your basket is empty.</p>
          <LinkButton
            url="/products/all"
            text="Explore our products"
            extraClasses="mt-10"
          />
        </>
      )}
    </section>
  );
}
