import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";
import { useEffect, useState } from "react";

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products?sortBy=rating&order=desc&limit=10")
      .then((res) => res.json())
      .then((data) => setBestSellers(data.products));
  }, []);
  return (
    <div className="mt-12">
      <h2 className="font-roboto font-extrabold text-2xl">
        Top 10 Rated Products:
      </h2>
      <ul className="flex flex-nowrap gap-10 w-full overflow-x-auto scroll-smooth pb-4">
        {bestSellers.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </ul>
    </div>
  );
}
