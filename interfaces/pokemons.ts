export interface PokemonListResponse {
  count:    number;
  next?:     string;
  previous?: string;
  results:  SmallPokemon[];
}
 
export interface SmallPokemon {
  name: string;
  url:  string;
}

export interface Pokemon extends SmallPokemon {
  id: number;
  img: string;
}
