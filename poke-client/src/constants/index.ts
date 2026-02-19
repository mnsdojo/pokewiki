export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:3000";

export const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-neutral-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400 text-black",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-purple-800",
  dragon: "bg-indigo-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300 text-black",
};
