import { useQuery, useQueryClient } from "@tanstack/react-query";

import { POKE_API_BASE_URL } from "@/constants";
import type {
  PaginatedPokemon,
  Pokemon,
  PokemonAPIResponseType,
  PokemonListResponse,
} from "@/types/pokemon";
import { useEffect } from "react";

async function fetchPokemonDetails(
  url: string,
  signal?: AbortSignal,
): Promise<Pokemon> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error("Failed to fetch Pokémon details");

  const data: PokemonAPIResponseType = await response.json();
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    sprites: data.sprites,
  };
}

async function fetchPokemonList(
  page: number,
  limit: number = 20,
  signal?: AbortSignal,
) {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `${POKE_API_BASE_URL}?limit=${limit}&offset=${offset}`,
    { signal },
  );

  if (!response.ok) throw new Error("Failed to fetch Pokémon list");

  const data: PokemonListResponse = await response.json();

  const detailsPromises = data.results.map((p) => fetchPokemonDetails(p.url));
  const detailedResults = await Promise.all(detailsPromises);

  return {
    results: detailedResults,
    next: offset + limit < data.count ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
    count: data.count,
  };
}

export function usePokemon(page: number = 1, limit: number = 20) {
  const queryClient = useQueryClient();
  const query = useQuery<PaginatedPokemon>({
    queryKey: ["pokemon", page, limit],
    queryFn: ({ signal }) => fetchPokemonList(page, limit, signal),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000, 
  });
  //Prefetching next page in the background..
  useEffect(() => {
    if (!query.data?.next) return;

    queryClient.prefetchQuery({
      queryKey: ["pokemon", query.data.next, limit],
      queryFn: ({ signal }) =>
        fetchPokemonList(query.data.next!, limit, signal),
      staleTime: 5 * 60 * 1000,
    });
  }, [query.data?.next, limit, queryClient]);

  const hasNextPage = Boolean(query.data?.next);
  const hasPrevPage = Boolean(query.data?.prev);
  const isEmpty = query.data?.results?.length === 0;

  return {
    ...query,
    hasNextPage,
    hasPrevPage,
    isEmpty,
  };
}
