import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

import { PokemonGameContext, PokemonListContext } from "../";
import type { PokemonGameState, PokemonListState } from "../";

export const PokemonProvider = component$(() => {
  const pokemonGameIni = useStore<PokemonGameState>({
    pokemonId: 1,
    showBackImage: false,
    isPokemonVisible: true,
  });

  const pokemonListini = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
    isEnd: false,
  });

  useContextProvider(PokemonGameContext, pokemonGameIni);
  useContextProvider(PokemonListContext, pokemonListini);

  return <Slot />;
});
