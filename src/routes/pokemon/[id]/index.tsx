import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) redirect(301, "/");
  if (id <= 0 || id >= 1000) redirect(301, "/");

  return id;
});

export default component$(() => {
  // const location = useLocation();

  const pokemonId = usePokemonId();
  const {
    isPokemonVisible,
    showBackImage,

    spinPokemon,
    showPokemon,
  } = usePokemonGame();

  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        isVisible={isPokemonVisible.value}
        backImage={showBackImage.value}
        size={300}
      />
      <div class="mt-2">
        <button onClick$={spinPokemon} class="btn btn-primary mr-2">
          Voltear
        </button>
        <button onClick$={showPokemon} class="btn btn-primary mr-2">
          {!isPokemonVisible.value ? "Revelar" : "Ocultar"}
        </button>
      </div>
    </>
  );
});
