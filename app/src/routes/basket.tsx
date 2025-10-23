import { createFileRoute } from "@tanstack/react-router";
import { useBasketStore } from "@/stores/basket";
import { priceFormat } from "@/utils";
import { LinkButton } from "@/ui/components";

export const Route = createFileRoute("/basket")({
  component: RouteComponent,
});

function RouteComponent() {
  const { basket, removeItem, totalCost } = useBasketStore();

  return (
    <section className="mt-16">
      {basket.length ? (
        <>
          <h1 className="text-3xl font-bold">Your Basket:</h1>
          <ul>
            {basket.map((product) => (
              <li
                key={product.transitionId}
                className="flex items-center gap-4 py-8 border-b-1 border-neutral-200 first-of-type:border-t-1 first-of-type:mt-12"
              >
                <img src={product.thumbnail} alt="" width="100" height="100" />
                <p>{product.title} </p>
                <div className="ml-auto flex gap-5 items-center">
                  <p className="text-lg">{priceFormat(product.price)}</p>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => removeItem(product)}
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
          </div>
        </>
      ) : (
        <p className="mt-12 text-center text-6xl">Your basket is empty.</p>
      )}
    </section>
  );
}
