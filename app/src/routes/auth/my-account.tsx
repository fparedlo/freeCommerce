import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/my-account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/my-account"!</div>;
}
