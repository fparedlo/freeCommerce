import type { BasketItem } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type BasketStore = {
  basket: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (item: BasketItem) => void;
  totalCost: () => number;
  cleanBasket: () => void;
};

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      basket: [],
      addItem: (item: BasketItem) =>
        set({
          // we allow adding to the basket the same item multiple times
          basket: [...(get().basket || []), item],
        }),
      removeItem: (item: BasketItem) => {
        const oldBasket = get().basket || [];
        const updatedBasket = oldBasket.filter(
          // amazonq-ignore-next-line
          (elem) => elem.transitionId !== item.transitionId,
        );
        set({
          basket: updatedBasket,
        });
      },
      totalCost: () => {
        return (get().basket || []).reduce((acc, item) => acc + item.price, 0);
      },
      cleanBasket: () => set({ basket: [] }),
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
