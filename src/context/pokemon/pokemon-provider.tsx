import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
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

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const {pokemonId=1,
      showBackImage=false,
    isPokemonVisible=true} = JSON.parse(
        localStorage.getItem("pokemon-game")!
      ) as PokemonGameState;
      pokemonGameIni.pokemonId= pokemonId;
      pokemonGameIni.showBackImage= showBackImage;
      pokemonGameIni.isPokemonVisible= isPokemonVisible;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGameIni.pokemonId,
      pokemonGameIni.showBackImage,
      pokemonGameIni.isPokemonVisible,
    ]);
    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGameIni));
  });

  return <Slot />;
});
