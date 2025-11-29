import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useOrderStore } from "@/stores/order";
import { Button } from "@/ui/components";
import { priceFormat } from "@/utils";
import { formatDate } from "@/utils/formatDate";

export const Route = createFileRoute("/checkout/order-confirmation")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      order: (search.order as string) || "",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { order } = Route.useSearch();
  const { currentOrder, getOrderByNumber } = useOrderStore();

  // Get order from current or history
  const orderData = currentOrder || getOrderByNumber(order);

  if (!orderData) {
    return (
      <section className="mt-16 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4 block">
            error
          </span>
          <h1 className="font-extrabold text-3xl mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the order you're looking for.
          </p>
          <Button
            type="button"
            action={() => navigate({ to: "/products/all" })}
            text="Back to Store"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <span className="material-symbols-outlined text-6xl text-green-500 mb-4 block">
            check_circle
          </span>
          <h1 className="font-extrabold text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, {orderData.shipping.firstName}
          </p>
          <p className="text-gray-500">
            We've sent a confirmation email to{" "}
            <strong>{orderData.shipping.email}</strong>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 pb-8 border-b">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-bold text-lg">{orderData.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date</p>
              <p className="font-medium">{formatDate(orderData.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Total</p>
              <p className="font-bold text-2xl text-green-600">
                {priceFormat(orderData.total)}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div
                  key={item.transitionId}
                  className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{priceFormat(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t flex justify-between items-center">
              <span className="text-lg font-semibold">Order Total:</span>
              <span className="text-2xl font-bold">
                {priceFormat(orderData.total)}
              </span>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-bold mb-3">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {orderData.shipping.firstName} {orderData.shipping.lastName}
                </p>
                <p className="text-gray-700">{orderData.shipping.address}</p>
                <p className="text-gray-700">
                  {orderData.shipping.city}, {orderData.shipping.state}{" "}
                  {orderData.shipping.postalCode}
                </p>
                <p className="text-gray-700">{orderData.shipping.country}</p>
                <p className="text-gray-600 mt-2">{orderData.shipping.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-bold mb-3">Payment Method</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{orderData.payment.cardType}</p>
                <p className="text-gray-700">
                  •••• •••• •••• {orderData.payment.cardNumber}
                </p>
                <p className="text-gray-600 mt-2">
                  {orderData.payment.cardholderName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fake shipping info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 mb-8">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-blue-600 text-3xl">
              local_shipping
            </span>
            <div>
              <h3 className="font-bold text-lg mb-2">Shipping Information</h3>
              <p className="text-gray-700">
                Your order will be shipped in 2-3 business days.
              </p>
              <p className="text-gray-700">
                You will receive an email with the tracking number when your
                order is dispatched.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 sm:p-6 mb-8">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-yellow-600 text-3xl">
              info
            </span>
            <div>
              <h3 className="font-bold text-lg mb-2">Important Note</h3>
              <p className="text-gray-700">
                This is a demo order. No real payment has been processed and no
                product will be shipped.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            type="button"
            action={() => navigate({ to: "/products/all" })}
            text="Continue Shopping"
            invert
          />
          <Button
            type="button"
            action={() => navigate({ to: "/" })}
            text="Back to Home"
          />
        </div>
      </div>
    </section>
  );
}
