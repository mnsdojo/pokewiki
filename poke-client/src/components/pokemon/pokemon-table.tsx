import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

import type { Pokemon } from "@/types/pokemon";

interface PokemonTableProps {
  data: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

type SortKey = "name" | "height" | "type" | "id";

export function PokemonTable({ data, onSelect }: PokemonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = [...data].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortKey === "type") {
      aValue = a.types[0];
      bValue = b.types[0];
    } else {
      aValue = a[sortKey];
      bValue = b[sortKey];
    }

    if (aValue < bValue) return sortDir === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <th
                className="px-6 py-4 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-2">
                  SR# <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Name <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-2">
                  Type <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort("height")}
              >
                <div className="flex items-center gap-2">
                  Height <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                    {/* Pokéball */}
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 rounded-full border-4 border-neutral-300 dark:border-neutral-600 overflow-hidden">
                        <div className="w-full h-1/2 bg-red-500" />
                        <div className="w-full h-1/2 bg-white dark:bg-neutral-800" />
                      </div>
                      {/* Center divider line */}
                      <div className="absolute top-[calc(50%-2px)] left-0 w-full h-1 bg-neutral-300 dark:bg-neutral-600" />
                      {/* Center button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white dark:bg-neutral-800 border-4 border-neutral-300 dark:border-neutral-600 z-10" />
                    </div>

                    <p className="text-lg font-bold text-neutral-700 dark:text-neutral-200">
                      No Pokémon here!
                    </p>
                    <p className="text-sm text-neutral-400 max-w-xs">
                      Looks like this Pokémon fled or hasn't been discovered
                      yet. Try a different search!
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors group cursor-pointer"
                  onClick={() => onSelect(pokemon)}
                >
                  <td className="px-6 py-4 font-mono text-sm text-neutral-400">
                    #{String(pokemon.id).padStart(3, "0")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="font-bold text-neutral-700 dark:text-neutral-200 capitalize group-hover:text-primary transition-colors">
                        {pokemon.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-400 capitalize"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {pokemon.height / 10} m
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(pokemon);
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
