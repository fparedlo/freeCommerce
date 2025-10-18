import { Link, useRouteContext } from "@tanstack/react-router";

export function Login() {
  const { authData } = useRouteContext({ from: '__root__' });
  return (
    <div className="ml-4 flex items-center gap-2">
      <div>
        <p className="text-md font-light text-right"></p>
      </div>
      <Link
        to="/auth/login"
        aria-label="login"
        className="flex items-center gap-1 text-md font-light text-right"
      >
        {authData.success ? <span>{authData.data?.firstName}</span> : <span>Sign In</span>}
        <span className="material-symbols-outlined text-4xl! md:text-6xl!">
          person
        </span>
      </Link>
    </div>
  );
}
