import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonId = useSignal(1); // primitivos, boleans, strings, etc

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
        width={200}
        height={200}
        alt="a Pokemon"
      />
      <div class="mt-2">
        <button
          onClick$={() => {
            pokemonId.value -= 1;
          }}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => {
            pokemonId.value += 1;
          }}
          class="btn btn-primary"
        >
          Siquiente
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primer aplicación usando qwik",
    },
  ],
};
