import { Link, useLocation } from "react-router";
import { useSession, signOut } from "../lib/auth";
import { LogOut, User } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {
  const { data: session } = useSession();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="w-3 h-3 bg-white rounded-full border border-primary" />
              </div>
              <div className="text-xl font-black tracking-tight">
                <span className="text-primary">Poké</span>
                <span className="text-neutral-900 dark:text-white">Wiki</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {session && (
              <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                <Link
                  to="/dashboard"
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    isActive("/dashboard")
                      ? "bg-white dark:bg-neutral-700 text-primary shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/reports"
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    isActive("/reports")
                      ? "bg-white dark:bg-neutral-700 text-primary shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  Reports
                </Link>
              </nav>
            )}

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              {session ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      {session.user.name || "Trainer"}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-bold text-neutral-600 hover:text-primary transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded-full transition-colors shadow-lg shadow-primary/20"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
