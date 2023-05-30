import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  // the "useSignal" es for Primitives, then whe need to use "useStore"
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
  });

  //It is visible only for the client
  useVisibleTask$(async({track}) => {
    track(()=>{ pokemonState.currentPage});
    const pokemons =await getSmallPokemons( pokemonState.currentPage*10);
    //comment the next one and hide the "Anterior" button
    // pokemonState.pokemons=pokemons;
    pokemonState.pokemons=[...pokemonState.pokemons, ...pokemons];
  })

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span> Página actual: {pokemonState.currentPage}</span>
        <span>Está cargando Página:</span>
      </div>
      <div class="mt-10">
        {/*Hide this button because spread the pokemonsState adding more pokemons*/}
        {/* <button
          onClick$={() => (pokemonState.currentPage -= 1)}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </button> */}
        <button
          onClick$={() => (pokemonState.currentPage += 1)}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} isVisible={true}/>
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
