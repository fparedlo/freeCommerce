import type { Product } from "@/types";
import { priceFormat } from "@/utils";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  return (
    <li className="group-[.is-carousel]:flex-none group-[.is-plp]:flex-auto">
      <article className="h-[362px]">
        <Link to="/product/$productSku" params={{ productSku: product.sku }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-[252px] mx-auto object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/300x300?text=No+Image";
            }}
          />
          <h1 className="text-lg font-semibold border-b-2 border-dashed py-4 mb-4">
            {product.title.length > 30
              ? product.title.slice(0, 30) + "..."
              : product.title}
          </h1>
          <div className="grid grid-cols-2 text-xl">
            <p className="">{priceFormat(product.price)}</p>
            <p className="flex gap-1 items-center justify-end text-lg">
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
