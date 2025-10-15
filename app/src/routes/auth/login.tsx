import { createFileRoute } from "@tanstack/react-router";
import userLogin from "@/api/auth/login";
import { Button } from "@/ui/components";
export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  // const [status, setStatus] = useState<boolean|null>(null)
  const tryLogin = (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (username.length > 0 && password.length > 8) {
      userLogin(username, password);
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
            className="text-2xl py-4 px-6 block w-full border-2"
            placeholder="JohnDoe"
            required
          />
        </label>
        <label>
          <span className="">Password:</span>
          <input
            type="password"
            name="password"
            className="text-2xl py-4 px-6 block w-full border-2"
            placeholder="********"
            required
          />
        </label>
        <Button type="submit" text="Login" />
      </form>
    </section>
  );
}
