import type { BasketItem } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type basketStore = {
  basket: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (item: BasketItem) => void;
  totalCost: () => number;
};

export const useBasketStore = create<basketStore>()(
  persist(
    (set, get) => ({
      basket: [],
      addItem: (item: BasketItem) =>
        set({
          basket: [...(get().basket || []), item],
        }),
      removeItem: (item: BasketItem) => {
        const oldBasket = get().basket || [];
        const updatedBasket = oldBasket.filter(
          (elem) => elem.transitionId !== item.transitionId,
        );
        set({
          basket: updatedBasket,
        });
      },
      totalCost: () => {
        return (get().basket || []).reduce((acc, item) => acc + item.price, 0);
      },
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
