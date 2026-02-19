import { cn } from "@/lib/utils";

interface PokemonLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function PokemonLoader({
  className,
  size = "md",
  text = "Catching 'em all...",
}: PokemonLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-24 h-24 border-8",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div
        className={cn(
          "relative rounded-full bg-white overflow-hidden animate-spin border-neutral-900",
          sizeClasses[size],
        )}
        style={{ animationDuration: "1s" }}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 border-b-2 border-neutral-900" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-full border-2 border-neutral-900 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-neutral-200 rounded-full border border-neutral-400" />
        </div>
      </div>
      {text && (
        <p className="text-neutral-500 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}
