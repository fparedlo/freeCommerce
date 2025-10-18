import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { auth, me } from "@/api/auth";
import { Button } from "@/ui/components";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuth = await me();
    if (isAuth.success) {
      throw redirect({
        to: "/auth/my-account",
      });
    }
  },
});

function RouteComponent() {
  const [loginIncorrect, setLoginIncorrect] = useState(false);
  const navigate = useNavigate();

  const tryLogin = async (formData: FormData) => {
    setLoginIncorrect(false);
    const data = {
      username: (formData.get("username") as string) ?? "",
      password: (formData.get("password") as string) ?? "",
    };

    if (data.username.length > 0 && data.password.length >= 8) {
      const loginResult = await auth(data);

      if (loginResult.success && loginResult.data?.accessToken) {
        navigate({ to: "/auth/my-account" });
      } else {
        setLoginIncorrect(true);
      }
    }
  };

  return (
    <section className="mt-16">
      <h1 className="font-extrabold text-2xl">Login:</h1>
      <form action={tryLogin} className="grid gap-8 mt-6">
        <label>
          <span className="">User name:</span>
          <input
            type="text"
            name="username"
            className="mt-1.5 text-2xl py-4 px-6 block w-full border-2"
            placeholder="JohnDoe"
            required
          />
        </label>
        <label>
          <span className="">Password:</span>
          <input
            type="password"
            name="password"
            className="mt-1.5 text-2xl py-4 px-6 block w-full border-2"
            placeholder="********"
            required
          />
        </label>
        <Button type="submit" text="Login" />
        {loginIncorrect && (
          <p className="text-center text-red-700">
            The login details are incorrect, try again.
          </p>
        )}
      </form>
    </section>
  );
}
