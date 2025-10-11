import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmation")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/order-confirmation"!</div>;
}
