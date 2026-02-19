export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PaginatedPokemon {
  results: Pokemon[];
  count: number;
  next: number | null;
  prev: number | null;
}

export type PokemonAPIResponseType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: Pokemon["sprites"];
};
