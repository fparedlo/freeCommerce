import type { Product } from "@/types";
import { ProductCard } from "@/ui/components";

export function ProductsGrid({ data }: { data: Product[] }) {
  return (
    <ul className="flex flex-wrap gap-10 w-full group is-plp">
      {data.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </ul>
  );
}
