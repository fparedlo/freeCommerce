import type { ImportedUserData } from "@/types";
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
  const { data }: { data: ImportedUserData } = authData;

  return (
    <section className="mt-16">
      <h1 className="font-extrabold text-2xl">
        My Account: {data.firstName} {data.lastName}
      </h1>

      <p className="mt-2 font-bold">Birth date:</p>
      <p>{formatDate(data.birthDate)}</p>

      <p className="mt-2 font-bold">Email:</p>
      <p>{data.email}</p>

      <p className="mt-2 font-bold">Contact Number:</p>
      <p>{data.phone}</p>

      <p className="mt-2 font-bold">Address:</p>
      <p>
        {data.address.address}, {data.address.city}, {data.address.stateCode}{" "}
        {data.address.postalCode}, {data.address.country}
      </p>

      <p></p>
    </section>
  );
}
