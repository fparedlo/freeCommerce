import type { Product } from "@/types";
import PriceFormat from "@/utils/priceFormat";
import { Link } from "@tanstack/react-router";

export default function ProductCard({ product }: { product: Product }) {

  return (
    <li className="w-3xs flex-none snap-center">
      <article>
        <Link to="/product/$productId" params={{productId : product.sku}}>
          <img src={product.thumbnail} alt="" loading="lazy" />
          <h1 className="font-roboto text-lg font-[600] border-b-2 border-dashed py-4 mb-4">
            {product.title}
          </h1>
          <div className="grid grid-cols-2 text-xl">
            <p className="">{PriceFormat(product.price)}</p>
            <p className="flex gap-1 items-center justify-end">
              {product.rating}
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nOXSzyqEURjH8Q9xARakXIHsJ8otWNixV/7UZMuCJsWsrWYv1hbchVnLBUhqsFOjMHrrTL3xDvOMdxbyq2d1fuf7recc/luOcDgs+AI6aeaHITjLCU7Lhk+hnRO8YLpMwX4O3p29suBjuC0Q3GE8AprBKqo4QAPnaBbAu9NMnUa6U02MjPUlN9+AOsG5LhLUSxTUe61pG2+/AL+j9tNbLON5AHgbK/0+eAX3AfgDFgWzFBBk3XB2A4KdQQSXAcFFFD6Cx4DgCaMRwVwBpIW1NK2C8+xO39n49LdPMJk7n8AxXnO99YhgK126Sl+2Vyqpk3U3I4Jsn7N97jXS/YP5AB/luaLoTDvsAAAAAElFTkSuQmCC"
                alt="star"
                className="inline w-4 h-4"
              />
            </p>
          </div>
        </Link>
      </article>
    </li>
  );
}
