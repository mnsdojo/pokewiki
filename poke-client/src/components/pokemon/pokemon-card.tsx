import { TYPE_COLORS } from "@/constants";
import type { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}
function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  return (
    <div
      onClick={() => onSelect(pokemon)}
      className="group relative bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-100 dark:border-neutral-800 overflow-hidden hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 dark:bg-neutral-800 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 mb-4 relative">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-2xl"
          />
        </div>
        <span className="text-xs font-bold text-neutral-400 mb-1">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <h3 className="text-xl font-bold capitalize mb-3 text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
          {pokemon.name}
        </h3>

        <div className="flex gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-3 py-1 rounded-full text-xs font-bold text-white capitalize shadow-sm ${TYPE_COLORS[type] || "bg-neutral-500"}`}
            >
              {type}
            </span>
          ))}
        </div>

        <button className="w-full py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-semibold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
