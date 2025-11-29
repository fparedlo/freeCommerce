import type { OrderData } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OrderStore = {
  currentOrder: OrderData | null;
  orderHistory: OrderData[];
  setCurrentOrder: (order: OrderData) => void;
  completeOrder: () => void;
  getOrderByNumber: (orderNumber: string) => OrderData | undefined;
};

// Helper function to generate order number
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      currentOrder: null,
      orderHistory: [],
      setCurrentOrder: (order: OrderData) =>
        set({
          currentOrder: order,
        }),
      completeOrder: () => {
        const current = get().currentOrder;
        if (current) {
          set({
            orderHistory: [...get().orderHistory, current],
            currentOrder: null,
          });
        }
      },
      getOrderByNumber: (orderNumber: string) => {
        return get().orderHistory.find(
          (order) => order.orderNumber === orderNumber,
        );
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
