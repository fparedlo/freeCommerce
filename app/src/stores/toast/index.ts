import { create } from "zustand";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "info";
  product?: {
    title: string;
    thumbnail: string;
  };
  showToast: (
    message: string,
    type?: "success" | "error" | "info",
    product?: { title: string; thumbnail: string },
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: "",
  type: "info",
  product: undefined,
  showToast: (message, type = "info", product) => {
    set({ isVisible: true, message, type, product });
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));
