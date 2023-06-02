import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
  pokemonId: number; // primitivos, boleans, strings, etc
  showBackImage: boolean;
  isPokemonVisible: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');
