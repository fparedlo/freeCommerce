import type { BasketItem } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type basketStore = {
  basket: Set<BasketItem>;
  addItem: (item: BasketItem) => void;
};

// TODO: do not use new Set, add quantity value, find element and do a +1
// TODO create a remove item function and decide logic
export const useBasketStore = create<basketStore>()(
  persist(
    (set, get) => ({
      basket: new Set<BasketItem>(),
      addItem: (item: BasketItem) =>
        set({ basket: new Set([...get().basket, item]) }),
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
