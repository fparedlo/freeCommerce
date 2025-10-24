import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { login } from "@/api/auth";
import { Button } from "@/ui/components";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.authData.success) {
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
      const loginResult = await login(data);

      if (loginResult.success && loginResult.data?.accessToken) {
        navigate({ to: "/auth/my-account" });
      } else {
        setLoginIncorrect(true);
      }
    }
  };

  return (
    <section className="mt-10">
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
      <div className="border-2 p-4 mt-6 border-neutral-400 text-neutral-500 bg-neutral-100">
        <p className="mb-2">Please use the following login details:</p>
        <p>
          <strong>user:</strong> johnd
        </p>
        <p>
          <strong>password:</strong> johndpass
        </p>
      </div>
    </section>
  );
}
