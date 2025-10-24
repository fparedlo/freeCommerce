import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/order-confirmation")({
  component: RouteComponent,
});

function RouteComponent() {
  // amazonq-ignore-next-line
  return <div>Hello "/checkout/order-confirmation"!</div>;
}
