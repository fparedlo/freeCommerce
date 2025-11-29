import { useToastStore } from "@/stores/toast";

export function Toast() {
  const { isVisible, message, type, product, hideToast } = useToastStore();

  if (!isVisible) return null;

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${bgColors[type]} transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm`}
    >
      <div className="flex items-start gap-3">
        {product && (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-12 h-12 object-cover rounded bg-white"
          />
        )}
        <div className="flex-1">
          <p className="font-bold text-lg">{message}</p>
          {product && <p className="text-sm opacity-90">{product.title}</p>}
        </div>
        <button
          onClick={hideToast}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  );
}
