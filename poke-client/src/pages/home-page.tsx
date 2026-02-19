import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Poke</span>Wiki
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 md:p-24 space-y-8 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white">
            Master the <span className="text-primary">World of Pokémon</span>
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate companion for trainers. Track, analyze, and discover Pokémon with advanced analytics and a beautiful interface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-8 h-12 text-base">
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
