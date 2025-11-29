import { CheckoutForm } from "@/ui/components/CheckoutForm";
import { createFileRoute } from "@tanstack/react-router";
import type { OrderData } from "@/types";
import { useToastStore } from "@/stores/toast";

export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authData } = Route.useRouteContext() ?? {
    authData: { success: false },
  };
  const { showToast } = useToastStore();

  const handleOrderComplete = (order: OrderData) => {
    showToast(`Order ${order.orderNumber} created successfully!`, "success");
  };

  return (
    <section className="mt-16">
      <h1 className="font-extrabold text-3xl mb-8">Checkout</h1>
      <CheckoutForm
        userEmail={authData.success ? authData.data?.email : undefined}
        userName={
          authData.success
            ? `${authData.data?.firstName} ${authData.data?.lastName}`
            : undefined
        }
        onComplete={handleOrderComplete}
      />
    </section>
  );
}
