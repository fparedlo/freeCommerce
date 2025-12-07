import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { login } from "@/api/auth";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { authData } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();
  const user = authData.data;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      if (!user?.username || !user?.password) {
        console.error("User credentials not available");
        navigate({ to: "/" });
        return;
      }
      const data = {
        username: user.username,
        password: user.password,
        expiresInMins: 0,
      };
      const logout = await login(data);
      if (logout.success) {
        setIsOpen(false);
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="ml-4 relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-md font-light text-right cursor-pointer"
      >
        <span>{user?.firstName}</span>
        <span className="material-symbols-outlined text-4xl! md:text-6xl! rounded-full hover:bg-neutral-100 p-2">
          person
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
          <Link
            to="/auth/my-account"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-md hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">
                account_circle
              </span>
              <span>My Account</span>
            </div>
          </Link>

          <Link
            to="/auth/my-account"
            hash="orders"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-md hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">
                receipt_long
              </span>
              <span>Order History</span>
            </div>
          </Link>

          <hr className="my-2 border-neutral-200" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-md hover:bg-neutral-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">logout</span>
              <span>Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
