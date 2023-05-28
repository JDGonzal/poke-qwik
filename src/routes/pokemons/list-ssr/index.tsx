import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import { BasicPokemonInfo, PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async()=>{
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');
  const data = await resp.json() as PokemonListResponse;

  return data.results;
})

export default component$(() => {

  const pokemonsResp = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span> Current offset: xxx</span>
        <span>Está cargando Página: xxx</span>
      </div>
      <div class="mt-10">
        <Link class ="btn btn-primary mr-2">Anteriores</Link>
        <Link class ="btn btn-primary mr-2">Siguientes</Link>
      </div>

      <div class ="grid grid-cols-6 mt-5">
      {
        pokemonsResp.value.map( pokemon=>(
          <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
            <span class="capitalize">{pokemon.name}</span>
          </div> 
        ))
      }
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
