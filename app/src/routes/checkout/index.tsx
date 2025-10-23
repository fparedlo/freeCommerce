import { Button, LinkButton } from "@/ui/components";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/checkout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [guest, setGuest] = useState<boolean>(false);
  const { authData } = Route.useRouteContext();
  const continueAsGuest = () => setGuest(true);
  console.log(authData);
  return (
    <section className="mt-16">
      {!authData.success && !guest && (
        <>
          <h1 className="font-extrabold text-3xl mb-5">Continue as...</h1>
          <Button
            type="button"
            text="Guest"
            action={continueAsGuest}
            extraClasses=""
            invert
          ></Button>

          <LinkButton
            url="/auth/login"
            text="Login"
            extraClasses="mt-4"
          ></LinkButton>
        </>
      )}

      {!authData.success && guest && <h1>Hello Guest</h1>}

      {authData.success && <>Hello {authData.data?.firstName}</>}
    </section>
  );
}
