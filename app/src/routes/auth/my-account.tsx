import { formatDate } from "@/utils/formatDate";
import { createFileRoute, redirect } from "@tanstack/react-router";

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
  const user = authData.data;
  return (
    <section className="mt-16">
      <h1 className="font-extrabold text-2xl">
        My Account: {user?.firstName} {user?.lastName}
      </h1>

      <p className="mt-2 font-bold">Birth date:</p>
      <p>{user?.birthDate && formatDate(user?.birthDate)}</p>

      <p className="mt-2 font-bold">Email:</p>
      <p>{user?.email}</p>

      <p className="mt-2 font-bold">Contact Number:</p>
      <p>{user?.phone}</p>

      <p className="mt-2 font-bold">Address:</p>
      <p>
        {user?.address.address}, {user?.address.city}, {user?.address.stateCode}
        ,{user?.address.postalCode}, {user?.address.country}
      </p>

      <p></p>
    </section>
  );
}
