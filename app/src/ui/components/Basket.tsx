import { useBasketStore } from "@/stores/basket";
import { Link } from "@tanstack/react-router";

export function Basket() {
  const { basket } = useBasketStore();

  return (
    <div className="ml-4 flex items-center gap-2">
      <div>
        <p className="text-md font-light text-right leading-4 md:leading-6">
          {basket.length} {basket.length === 1 ? "item" : "items"}
        </p>
      </div>
      <Link to="/basket" aria-label="Basket">
        <span className="material-symbols-outlined text-4xl! md:text-6xl!">
          shopping_bag
        </span>
      </Link>
    </div>
  );
}
