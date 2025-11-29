import { Button } from "@/ui/components";
import { Input } from "@/ui/components/Input";
import type { OrderData } from "@/types";
import type {
  ShippingData,
  BillingData,
  PaymentData,
} from "@/utils/validation";
import { useState } from "react";
import { shippingSchema, paymentSchema } from "@/utils/validation";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { generateOrderNumber, useOrderStore } from "@/stores/order";
import { useBasketStore } from "@/stores/basket";
import { priceFormat } from "@/utils";

interface CheckoutFormProps {
  userEmail?: string;
  userName?: string;
  onComplete: (order: OrderData) => void;
}

type FormErrors = {
  shipping?: Partial<Record<keyof ShippingData, string>>;
  billing?: Partial<Record<keyof BillingData, string>>;
  payment?: Partial<Record<keyof PaymentData, string>>;
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  userEmail,
  userName,
  onComplete,
}) => {
  const navigate = useNavigate();
  const { basket, totalCost, cleanBasket } = useBasketStore();
  const { setCurrentOrder } = useOrderStore();

  const [step, setStep] = useState<"shipping" | "payment" | "review">(
    "shipping",
  );
  const [useSameForBilling] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingData, setShippingData] = useState<Partial<ShippingData>>({
    email: userEmail || "",
    firstName: userName?.split(" ")[0] || "",
    lastName: userName?.split(" ")[1] || "",
  });
  const [billingData, setBillingData] = useState<Partial<BillingData>>({});
  const [paymentData, setPaymentData] = useState<Partial<PaymentData>>({});

  const [errors, setErrors] = useState<FormErrors>({});

  const handleShippingChange = (field: keyof ShippingData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors.shipping?.[field]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        shipping: { ...prev.shipping, [field]: undefined },
      }));
    }
  };

  const handleBillingChange = (field: keyof BillingData, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
    if (errors.billing?.[field]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        billing: { ...prev.billing, [field]: undefined },
      }));
    }
  };
  // Prevent unused warning - will be used when billing address is implemented
  void handleBillingChange;

  const handlePaymentChange = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
    if (errors.payment?.[field]) {
      setErrors((prev: FormErrors) => ({
        ...prev,
        payment: { ...prev.payment, [field]: undefined },
      }));
    }
  };

  const validateShipping = (): boolean => {
    try {
      shippingSchema.parse(shippingData);
      setErrors((prev) => ({ ...prev, shipping: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ShippingData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof ShippingData;
          fieldErrors[field] = err.message;
        });
        setErrors((prev) => ({ ...prev, shipping: fieldErrors }));
      }
      return false;
    }
  };

  const validatePayment = (): boolean => {
    try {
      paymentSchema.parse(paymentData);
      setErrors((prev) => ({ ...prev, payment: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof PaymentData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof PaymentData;
          fieldErrors[field] = err.message;
        });
        setErrors((prev) => ({ ...prev, payment: fieldErrors }));
      }
      return false;
    }
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const handleContinueToReview = () => {
    if (validatePayment()) {
      setStep("review");
    }
  };

  const getCardType = (cardNumber: string): string => {
    const firstDigit = cardNumber[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "American Express";
    return "Unknown";
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderNumber = generateOrderNumber();
    const order: OrderData = {
      orderNumber,
      date: new Date(),
      items: basket,
      total: totalCost(),
      shipping: shippingData as ShippingData,
      billing: useSameForBilling ? undefined : (billingData as BillingData),
      payment: {
        cardNumber: `****${paymentData.cardNumber?.slice(-4)}`,
        cardholderName: paymentData.cardholderName || "",
        cardType: getCardType(paymentData.cardNumber || ""),
      },
      status: "completed",
    };

    setCurrentOrder(order);
    onComplete(order);
    cleanBasket();

    navigate({
      to: "/checkout/order-confirmation",
      search: { order: orderNumber },
    });
  };

  if (basket.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
        <Button
          type="button"
          action={() => navigate({ to: "/products/all" })}
          text="Go Shopping"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2 order-2 lg:order-1">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex-1">
            <div
              className={`text-xs sm:text-sm font-medium ${step === "shipping" ? "text-black" : "text-gray-400"}`}
            >
              1. Shipping
            </div>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 mx-2 sm:mx-4"></div>
          <div className="flex-1">
            <div
              className={`text-xs sm:text-sm font-medium ${step === "payment" ? "text-black" : "text-gray-400"}`}
            >
              2. Payment
            </div>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 mx-2 sm:mx-4"></div>
          <div className="flex-1">
            <div
              className={`text-xs sm:text-sm font-medium ${step === "review" ? "text-black" : "text-gray-400"}`}
            >
              3. Review
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        {step === "shipping" && (
          <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                value={shippingData.firstName || ""}
                onChange={(e) =>
                  handleShippingChange("firstName", e.target.value)
                }
                error={errors.shipping?.firstName}
                required
              />
              <Input
                label="Last Name"
                type="text"
                value={shippingData.lastName || ""}
                onChange={(e) =>
                  handleShippingChange("lastName", e.target.value)
                }
                error={errors.shipping?.lastName}
                required
              />
              <Input
                label="Email"
                type="email"
                value={shippingData.email || ""}
                onChange={(e) => handleShippingChange("email", e.target.value)}
                error={errors.shipping?.email}
                className="md:col-span-2"
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={shippingData.phone || ""}
                onChange={(e) => handleShippingChange("phone", e.target.value)}
                error={errors.shipping?.phone}
                required
              />
              <Input
                label="Country"
                type="text"
                value={shippingData.country || ""}
                onChange={(e) =>
                  handleShippingChange("country", e.target.value)
                }
                error={errors.shipping?.country}
                required
              />
              <Input
                label="Address"
                type="text"
                value={shippingData.address || ""}
                onChange={(e) =>
                  handleShippingChange("address", e.target.value)
                }
                error={errors.shipping?.address}
                className="md:col-span-2"
                required
              />
              <Input
                label="City"
                type="text"
                value={shippingData.city || ""}
                onChange={(e) => handleShippingChange("city", e.target.value)}
                error={errors.shipping?.city}
                required
              />
              <Input
                label="State/Province"
                type="text"
                value={shippingData.state || ""}
                onChange={(e) => handleShippingChange("state", e.target.value)}
                error={errors.shipping?.state}
                required
              />
              <Input
                label="Postal Code"
                type="text"
                value={shippingData.postalCode || ""}
                onChange={(e) =>
                  handleShippingChange("postalCode", e.target.value)
                }
                error={errors.shipping?.postalCode}
                required
              />
            </div>
            <div className="mt-6">
              <Button
                type="button"
                action={handleContinueToPayment}
                text="Continue to Payment"
              />
            </div>
          </div>
        )}

        {/* Payment Form */}
        {step === "payment" && (
          <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              Payment Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Card Number"
                type="text"
                value={paymentData.cardNumber || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                  handlePaymentChange("cardNumber", value);
                }}
                error={errors.payment?.cardNumber}
                placeholder="1234567890123456"
                maxLength={16}
                helperText="16 digits without spaces"
                required
              />
              <Input
                label="Cardholder Name"
                type="text"
                value={paymentData.cardholderName || ""}
                onChange={(e) =>
                  handlePaymentChange("cardholderName", e.target.value)
                }
                error={errors.payment?.cardholderName}
                placeholder="JUAN PEREZ"
                required
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input
                  label="Month (MM)"
                  type="text"
                  value={paymentData.expiryMonth || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    handlePaymentChange("expiryMonth", value);
                  }}
                  error={errors.payment?.expiryMonth}
                  placeholder="12"
                  maxLength={2}
                  required
                />
                <Input
                  label="Year (YY)"
                  type="text"
                  value={paymentData.expiryYear || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                    handlePaymentChange("expiryYear", value);
                  }}
                  error={errors.payment?.expiryYear}
                  placeholder="25"
                  maxLength={2}
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  value={paymentData.cvv || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    handlePaymentChange("cvv", value);
                  }}
                  error={errors.payment?.cvv}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                type="button"
                action={() => setStep("shipping")}
                text="Back"
                invert
              />
              <Button
                type="button"
                action={handleContinueToReview}
                text="Review Order"
              />
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === "review" && (
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Review Order</h2>

            <div className="space-y-6">
              {/* Shipping Info */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Ship to:</h3>
                <p>
                  {shippingData.firstName} {shippingData.lastName}
                </p>
                <p>{shippingData.address}</p>
                <p>
                  {shippingData.city}, {shippingData.state}{" "}
                  {shippingData.postalCode}
                </p>
                <p>{shippingData.country}</p>
                <p className="mt-2">{shippingData.email}</p>
                <p>{shippingData.phone}</p>
                <button
                  onClick={() => setStep("shipping")}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Payment Method:</h3>
                <p>
                  {getCardType(paymentData.cardNumber || "")} ending in{" "}
                  {paymentData.cardNumber?.slice(-4)}
                </p>
                <p>{paymentData.cardholderName}</p>
                <button
                  onClick={() => setStep("payment")}
                  className="text-blue-600 text-sm mt-2 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is a demo checkout. No real payment
                will be processed.
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                type="button"
                action={() => setStep("payment")}
                text="Back"
                invert
              />
              <Button
                type="button"
                action={handlePlaceOrder}
                text={isProcessing ? "Processing..." : "Confirm Order"}
                disabled={isProcessing}
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1 order-1 lg:order-2">
        <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-gray-200 lg:sticky lg:top-4">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {basket.map((item) => (
              <div key={item.transitionId} className="flex gap-3 items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {priceFormat(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>{priceFormat(totalCost())}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
              <span>Total:</span>
              <span>{priceFormat(totalCost())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
