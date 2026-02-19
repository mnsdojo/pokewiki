import PokemonCard from "@/components/pokemon/pokemon-card";
import PokemonDetailModal from "@/components/pokemon/pokemon-detail-modal";
import { PokemonTable } from "@/components/pokemon/pokemon-table";
import { PokemonLoader } from "@/components/ui/pokemon-loader";
import { usePokemon } from "@/hooks/usePokemon";
import type { Pokemon } from "@/types/pokemon";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListIcon,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

const LIMIT = 10;

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

type PokemonType = (typeof POKEMON_TYPES)[number];

const TYPE_COLORS: Record<
  PokemonType,
  { bg: string; text: string; activeBg: string }
> = {
  normal: {
    bg: "bg-neutral-100 dark:bg-neutral-800",
    text: "text-neutral-600 dark:text-neutral-300",
    activeBg: "bg-neutral-400 text-white",
  },
  fire: {
    bg: "bg-orange-50 dark:bg-orange-950",
    text: "text-orange-600 dark:text-orange-400",
    activeBg: "bg-orange-500 text-white",
  },
  water: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-600 dark:text-blue-400",
    activeBg: "bg-blue-500 text-white",
  },
  electric: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    text: "text-yellow-600 dark:text-yellow-400",
    activeBg: "bg-yellow-400 text-white",
  },
  grass: {
    bg: "bg-green-50 dark:bg-green-950",
    text: "text-green-600 dark:text-green-400",
    activeBg: "bg-green-500 text-white",
  },
  ice: {
    bg: "bg-cyan-50 dark:bg-cyan-950",
    text: "text-cyan-600 dark:text-cyan-400",
    activeBg: "bg-cyan-400 text-white",
  },
  fighting: {
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-700 dark:text-red-400",
    activeBg: "bg-red-600 text-white",
  },
  poison: {
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-600 dark:text-purple-400",
    activeBg: "bg-purple-500 text-white",
  },
  ground: {
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-700 dark:text-amber-400",
    activeBg: "bg-amber-600 text-white",
  },
  flying: {
    bg: "bg-indigo-50 dark:bg-indigo-950",
    text: "text-indigo-600 dark:text-indigo-400",
    activeBg: "bg-indigo-400 text-white",
  },
  psychic: {
    bg: "bg-pink-50 dark:bg-pink-950",
    text: "text-pink-600 dark:text-pink-400",
    activeBg: "bg-pink-500 text-white",
  },
  bug: {
    bg: "bg-lime-50 dark:bg-lime-950",
    text: "text-lime-700 dark:text-lime-400",
    activeBg: "bg-lime-500 text-white",
  },
  rock: {
    bg: "bg-stone-100 dark:bg-stone-800",
    text: "text-stone-600 dark:text-stone-400",
    activeBg: "bg-stone-500 text-white",
  },
  ghost: {
    bg: "bg-violet-50 dark:bg-violet-950",
    text: "text-violet-700 dark:text-violet-400",
    activeBg: "bg-violet-600 text-white",
  },
  dragon: {
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-800 dark:text-blue-300",
    activeBg: "bg-blue-700 text-white",
  },
  dark: {
    bg: "bg-neutral-200 dark:bg-neutral-700",
    text: "text-neutral-800 dark:text-neutral-200",
    activeBg: "bg-neutral-700 text-white",
  },
  steel: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-400",
    activeBg: "bg-slate-500 text-white",
  },
  fairy: {
    bg: "bg-rose-50 dark:bg-rose-950",
    text: "text-rose-500 dark:text-rose-400",
    activeBg: "bg-rose-400 text-white",
  },
};

function Dashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [activeTypes, setActiveTypes] = useState<PokemonType[]>([]);

  const { data, isLoading, isError, hasNextPage, hasPrevPage } = usePokemon(
    page,
    LIMIT,
  );

  const totalPages = data ? Math.ceil(data.count / LIMIT) : 0;

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const toggleType = (type: PokemonType) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const clearTypes = () => setActiveTypes([]);

  const filteredData = data?.results.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      activeTypes.length === 0 ||
      activeTypes.every((t) => p.types?.includes(t));
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search current page..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all ${
              view === "grid"
                ? "bg-white dark:bg-neutral-700 shadow-sm text-primary"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-all ${
              view === "list"
                ? "bg-white dark:bg-neutral-700 shadow-sm text-primary"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Type Filter Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {activeTypes.length > 0 && (
            <button
              onClick={clearTypes}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
          {POKEMON_TYPES.map((type) => {
            const isActive = activeTypes.includes(type);
            const colors = TYPE_COLORS[type];
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                  isActive
                    ? `${colors.activeBg} border-transparent shadow-sm scale-105`
                    : `${colors.bg} ${colors.text} border-transparent hover:scale-105`
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        {activeTypes.length > 0 && (
          <p className="mt-2 text-xs text-neutral-400">
            Showing Pokémon with{" "}
            <span className="font-medium text-neutral-600 dark:text-neutral-300">
              all
            </span>{" "}
            selected types: {activeTypes.join(", ")}
          </p>
        )}
      </div>

      {/* Content Area */}
      {isLoading ? (
        <PokemonLoader className="py-20" size="lg" text="Catching 'em all..." />
      ) : isError ? (
        <ErrorMessage />
      ) : filteredData?.length === 0 ? (
        <EmptyState
          onClear={() => {
            setSearch("");
            clearTypes();
          }}
        />
      ) : (
        <>
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredData?.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onSelect={setSelectedPokemon}
                />
              ))}
            </div>
          ) : (
            <PokemonTable
              data={filteredData || []}
              onSelect={setSelectedPokemon}
            />
          )}
        </>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <span className="text-sm text-neutral-500">
          Page {page} of {totalPages}
        </span>
        <div className="flex bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm divide-x divide-neutral-200 dark:divide-neutral-800">
          <button
            disabled={!hasPrevPage}
            onClick={handlePrev}
            className="px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!hasNextPage}
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal Area */}
      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;

// ─── Helper Components ────────────────────────────────────────────────────────

const ErrorMessage = () => (
  <div className="text-center py-20 text-red-500">
    Failed to load Pokémon data. Please try again.
  </div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-20 flex flex-col items-center gap-4">
    {/* Sad Pokeball */}
    <div className="relative w-24 h-24">
      <div className="w-24 h-24 rounded-full border-4 border-neutral-800 dark:border-neutral-200 overflow-hidden shadow-lg opacity-40">
        <div className="w-full h-1/2 bg-red-500" />
        <div className="w-full h-1/2 bg-white dark:bg-neutral-200" />
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-neutral-800 dark:bg-neutral-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-neutral-100 border-4 border-neutral-800 dark:border-neutral-200 z-10" />
      </div>
      <div className="absolute -top-1 -right-1 text-2xl">😵</div>
    </div>

    <div className="flex flex-col items-center gap-1">
      <p className="text-neutral-700 dark:text-neutral-200 text-xl font-bold tracking-tight">
        No Pokémon found!
      </p>
      <p className="text-neutral-400 dark:text-neutral-500 text-sm max-w-xs">
        This Pokémon escaped! Try a different search or adjust your type
        filters.
      </p>
    </div>

    <button
      onClick={onClear}
      className="mt-1 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95 text-white text-sm font-semibold shadow-md transition-all flex items-center gap-2"
    >
      <span className="inline-flex w-4 h-4 rounded-full border-2 border-white overflow-hidden relative">
        <span className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-80" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white border border-red-500 z-10" />
      </span>
      Throw another Pokéball
    </button>
  </div>
);
