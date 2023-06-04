import {
  component$,
  useOnDocument,
  useTask$,
  $,
  useContext,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonListContext } from "~/context";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
// import type { SmallPokemon } from "~/interfaces";

// interface PokemonPageState {
//   currentPage: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
//   isEnd: boolean;
// }

export default component$(() => {
  // the "useSignal" es for Primitives, then whe need to use "useStore"
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   isLoading:false,
  //   pokemons: [],
  //   isEnd:false,
  // });
  // Change the "useStore" by "useContext"
  const pokemonList = useContext( PokemonListContext);

  //It is visible only for the client
  // useVisibleTask$(async({track}) => {
  //   track(()=>{ pokemonState.currentPage});
  //   const pokemons =await getSmallPokemons( pokemonState.currentPage*10);
  //   //comment the next one and hide the "Anterior" button
  //   // pokemonState.pokemons=pokemons;
  //   pokemonState.pokemons=[...pokemonState.pokemons, ...pokemons];
  // })

  useTask$(async ({ track }) => {
    track(() =>pokemonList.currentPage);

    pokemonList.isLoading=true;

    const pokemons = await getSmallPokemons(pokemonList.currentPage *10, 10);
    //comment the next one and hide the "Anterior" button
    // pokemonState.pokemons=pokemons;
    const lastPokemonQuantity = pokemonList.pokemons.length;
    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];

    pokemonList.pokemons.length>lastPokemonQuantity? pokemonList.isLoading=false: pokemonList.isEnd=true;
  });

  useOnDocument( "scroll",$(async(event) => {
      const maxScroll = await document.body.scrollHeight;
      const currentScroll = await window.scrollY+ window.innerHeight;
      if(await currentScroll== maxScroll && !pokemonList.isLoading){
        pokemonList.currentPage += await 1;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span> Página actual: {pokemonList.currentPage}</span>
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
          onClick$={() => (!pokemonList.isLoading?pokemonList.currentPage += 1: pokemonList.isEnd=true)}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-10 mt-5">
        {pokemonList.pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} isVisible={true} />
            <span>{pokemon.id}</span>
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
