import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useOrderStore } from "@/stores/order";
import { formatDate } from "@/utils/formatDate";
import { priceFormat } from "@/utils/priceFormat";
import type { OrderData } from "@/types";

export function OrderHistoryList() {
  const { orderHistory } = useOrderStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Sort orders by date (newest first)
  const sortedOrders = [...orderHistory].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const toggleExpand = (orderNumber: string) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  const getStatusColor = (status: OrderData["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  // Empty state
  if (orderHistory.length === 0) {
    return (
      <div className="mt-8 text-center py-12 bg-neutral-50 rounded-lg">
        <span className="material-symbols-outlined text-6xl text-neutral-400 mb-4">
          shopping_bag
        </span>
        <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
        <p className="text-neutral-600 mb-6">
          You haven't placed any orders yet. Start shopping to see your order
          history here!
        </p>
        <Link
          to="/products/all"
          search={{
            sortBy: "name",
            minRating: 0,
          }}
          className="inline-block bg-black text-white px-6 py-3 uppercase hover:bg-neutral-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4" id="orders">
        Order History
      </h2>

      {sortedOrders.map((order) => (
        <div
          key={order.orderNumber}
          className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Order Header */}
          <button
            onClick={() => toggleExpand(order.orderNumber)}
            className="w-full px-6 py-4 bg-white hover:bg-neutral-50 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold text-lg">{order.orderNumber}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium uppercase ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 text-md text-neutral-600">
                  <span>{formatDate(order.date.toISOString())}</span>
                  <span className="mx-2">•</span>
                  <span>{order.items.length} items</span>
                  <span className="mx-2">•</span>
                  <span className="font-bold text-black">
                    {priceFormat(order.total)}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-3xl text-neutral-400">
                {expandedOrder === order.orderNumber
                  ? "expand_less"
                  : "expand_more"}
              </span>
            </div>
          </button>

          {/* Order Details (Expanded) */}
          {expandedOrder === order.orderNumber && (
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              {/* Items */}
              <div className="mb-6">
                <h4 className="font-bold mb-3">Items</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.transitionId}
                      className="flex items-center gap-4 bg-white p-3 rounded"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-neutral-600">
                          SKU: {item.sku}
                        </p>
                      </div>
                      <p className="font-bold">{priceFormat(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-4">
                <h4 className="font-bold mb-2">Shipping Address</h4>
                <p className="text-neutral-700">
                  {order.shipping.firstName} {order.shipping.lastName}
                  <br />
                  {order.shipping.address}
                  <br />
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.postalCode}
                  <br />
                  {order.shipping.country}
                </p>
              </div>

              {/* Payment */}
              <div>
                <h4 className="font-bold mb-2">Payment Method</h4>
                <p className="text-neutral-700">
                  {order.payment.cardType} ending in {order.payment.cardNumber}
                  <br />
                  {order.payment.cardholderName}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
