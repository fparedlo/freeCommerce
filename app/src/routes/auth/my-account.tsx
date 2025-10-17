import { me } from "@/api/auth";
import { getSessionStorageItem } from "@/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/my-account")({
  component: RouteComponent,
  beforeLoad: async () => {
    const accessToken = getSessionStorageItem("accessToken");
    if (!accessToken) return;
    const isAuth = await me(accessToken);
    if (!isAuth.success) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/my-account"!</div>;
}
