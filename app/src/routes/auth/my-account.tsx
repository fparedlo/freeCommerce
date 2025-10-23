import { login } from "@/api/auth";
import { Button } from "@/ui/components";
import { formatDate } from "@/utils/formatDate";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/my-account")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.authData.success) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

function RouteComponent() {
  const { authData } = Route.useRouteContext();
  const navigate = useNavigate();
  const user = authData.data;

  const handleLogout = async () => {
    try {
      const data = {
        username: user?.username as string,
        password: user?.password as string,
        expiresInMins: 0,
      };
      const logout = await login(data);
      if (logout.success) {
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section className="mt-16">
      <h1 className="font-extrabold text-2xl">
        My Account: <span className="font-normal">{user?.firstName} {user?.lastName}</span>
      </h1>

      <p className="mt-6 font-bold">Birth date:</p>
      <p>{user?.birthDate && formatDate(user?.birthDate)}</p>

      <p className="mt-2 font-bold">Email:</p>
      <p>{user?.email}</p>

      <p className="mt-2 font-bold">Contact Number:</p>
      <p>{user?.phone}</p>

      <p className="mt-2 font-bold">Address:</p>
      <p>
        {user?.address.address}, {user?.address.city}, {user?.address.stateCode}{" "}
        {user?.address.postalCode}, {user?.address.country}
      </p>

      <Button
        type="button"
        extraClasses="mt-8"
        text="Logout"
        action={handleLogout}
      />
    </section>
  );
}
