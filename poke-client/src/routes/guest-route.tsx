import React from "react";
import { useSession } from "../lib/auth";
import { Navigate } from "react-router";
import { PokemonLoader } from "@/components/ui/pokemon-loader";

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  if (isPending)
    return (
      <PokemonLoader className="min-h-screen" size="lg" text="Loading..." />
    );
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default GuestRoute;
