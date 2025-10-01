import { useBasketStore } from "@/store/store";
import priceFormat from "@/utils/priceFormat";



export default function Basket () {
    const { basket, totalCost } = useBasketStore()


    return (
        <div>
            {basket.length > 0 ? (
                <div className="flex items-center gap-3">
                    <div>
                    <p className="text-md font-light text-right">{basket.length} {basket.length === 1 ? "item" : "items" }</p>
                    <p className="text-lg text-right">{priceFormat(totalCost())}</p>
                    </div>
                    <img src="/basket.svg" width="60" height="60"/>
                </div>
                ) : (
                <img src="/empty-basket.svg" width="60" height="60"/>
                )}
        </div>
    );
}