import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn.email({ email, password });

    if (error) {
      setError(error.message ?? "Invalid credentials");
      setLoading(false);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 relative z-10">
        <div className="bg-primary p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 border-4 border-white/50 shadow-inner flex items-center justify-center">
              <div className="w-12 h-12 bg-primary rounded-full relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              PokéWiki
            </h1>
            <p className="text-primary-foreground/80 mt-2 text-sm font-medium">
              Access the ultimate database
            </p>
          </div>
        </div>

        <div className="p-8 pt-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-neutral-700 mb-1.5"
              >
                Trainer Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ash@pallet-town.com"
                required
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium border border-red-100 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Accessing...
                </span>
              ) : (
                "Enter System"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-500 font-medium text-sm">
              New Trainer?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-bold hover:underline transition-all"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
