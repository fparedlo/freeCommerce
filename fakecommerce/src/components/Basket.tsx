import { useBasketStore } from "@/store/store";
import priceFormat from "@/utils/priceFormat";
import { Link } from "@tanstack/react-router";

export default function Basket() {
  const { basket, totalCost } = useBasketStore();

  return (
    <div>
      {basket.length > 0 ? (
        <div className="flex items-center gap-3">
          <div>
            <p className="text-md font-light text-right">
              {basket.length} {basket.length === 1 ? "item" : "items"}
            </p>
            <p className="text-lg text-right">{priceFormat(totalCost())}</p>
          </div>
          <Link to="/basket" aria-label="Basket">
            <img src="/basket.svg" width="60" height="60" alt="" />
          </Link>
        </div>
      ) : (
        <img src="/empty-basket.svg" width="60" height="60" alt="" />
      )}
    </div>
  );
}
