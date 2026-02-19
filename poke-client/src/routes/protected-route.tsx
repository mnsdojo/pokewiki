import { Navigate } from "react-router";
import { useSession } from "../lib/auth";
import { PokemonLoader } from "@/components/ui/pokemon-loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  if (isPending)
    return (
      <PokemonLoader
        className="min-h-screen"
        size="lg"
        text="Checking trainer ID..."
      />
    );
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
