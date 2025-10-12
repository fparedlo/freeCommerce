import { Link } from "@tanstack/react-router";

export default function Login() {
  return (
    <div className="ml-4 flex items-center gap-2">
      <div>
        <p className="text-md font-light text-right">Ferran</p>
      </div>
      <Link to="/login" aria-label="login">
        <span className="material-symbols-outlined text-6xl!">person</span>
      </Link>
    </div>
  );
}
