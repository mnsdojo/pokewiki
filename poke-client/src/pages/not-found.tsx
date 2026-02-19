import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX, Ghost } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white dark:bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full border border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 via-white to-red-500 opacity-50" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-neutral-100 dark:bg-neutral-800 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-50 dark:bg-red-900/10 rounded-full opacity-50 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <div className="relative">
              <Ghost className="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
              <SearchX className="w-6 h-6 text-red-500 absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 rounded-full p-0.5 border-2 border-white dark:border-neutral-900" />
            </div>
          </div>

          <h1 className="text-6xl font-black text-neutral-900 dark:text-white mb-2 tracking-tighter">
            404
          </h1>

          <h2 className="text-xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">
            Wild Page Fled!
          </h2>

          <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs mx-auto">
            The page you are looking for has escaped into the tall grass. We
            couldn't catch it!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>

            <Button
              onClick={() => navigate("/")}
              className="gap-2 bg-red-500 hover:bg-red-600 text-white border-none shadow-md hover:shadow-lg transition-all"
            >
              Return to Safety
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
