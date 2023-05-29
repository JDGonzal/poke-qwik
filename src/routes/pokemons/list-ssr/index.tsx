import { component$, useComputed$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { BasicPokemonInfo, PokemonListResponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    // console.log({query});
    const offset = Number(query.get("offset") || "0");
    if (isNaN(offset) || offset < 0) redirect(301, pathname);
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    const data = (await resp.json()) as PokemonListResponse;

    return data.results;
  }
);

export default component$<number>(() => {
  const pokemonsResp = usePokemonList();
  const location = useLocation();
  const currentOffset = useComputed$(() => {
    //const offsetString = location.url.searchParams.get('offset');
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get("offset") || 0);
  });
  console.log("location:", location.url.searchParams.get("offset"));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span> Current offset: {currentOffset}</span>
        <span>
          Está cargando Página:
          {location.isNavigating ? "en Proceso..." : "Listo"}
        </span>
      </div>
      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemonsResp.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
