import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1); // primitivos, boleans, strings, etc
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const changePokemonId = $((value: number) => {
    isPokemonVisible.value = false;
    if (value===0) {
      showBackImage.value=!(showBackImage.value);
      return;
    }
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <PokemonImage
        id={pokemonId.value}
        size={200}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />
      <div class="mt-2">
        <button
          onClick$={() => {
            changePokemonId(-1);
          }}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => {
            changePokemonId(+1);
          }}
          class="btn btn-primary mr-2"
        >
          Siquiente
        </button>
        <button
          onClick$={() => {
            changePokemonId(0);
          }}
          class="btn btn-primary mr-2"
        >
          Voltear
        </button>
        <button
          onClick$={() => {
            isPokemonVisible.value = !isPokemonVisible.value;
          }}
          class="btn btn-primary mr-2"
        >
          Revelar
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
