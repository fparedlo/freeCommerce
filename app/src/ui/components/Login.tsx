import { Link, useRouteContext } from "@tanstack/react-router";
import { UserMenu } from "./UserMenu";

export function Login() {
  const { authData } = useRouteContext({ from: "__root__" });

  // If user is logged in, show UserMenu dropdown
  if (authData.success) {
    return <UserMenu />;
  }

  // If not logged in, show Sign In link
  return (
    <div className="ml-4 flex items-center gap-2">
      <Link
        to="/auth/login"
        aria-label="login"
        className="flex items-center gap-1 text-md font-light text-right"
      >
        <span>Sign In</span>
        <span className="material-symbols-outlined text-4xl! md:text-6xl! rounded-full hover:bg-neutral-100 p-2">
          person
        </span>
      </Link>
    </div>
  );
}
