import { useBasketStore } from "@/stores/basket";
import { Link } from "@tanstack/react-router";

export function Basket() {
  const { basket } = useBasketStore();
  const basketLength = basket.length;
  return (
    <div className="ml-4 flex items-center gap-2">
      <div>
        <p className="text-md font-light text-right leading-4 md:leading-6">
          {basketLength} {basketLength === 1 ? "item" : "items"}
        </p>
      </div>
      <Link to="/basket" aria-label="Basket">
        <span className="material-symbols-outlined text-4xl! md:text-6xl! rounded-full hover:bg-neutral-100 p-2">
          shopping_bag
        </span>
      </Link>
    </div>
  );
}
