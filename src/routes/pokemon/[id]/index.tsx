import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const location = useLocation();

  return (
    <>
      <span class="text-5xl">Pokemon: {location.params.id}</span>

      <PokemonImage
        id={parseInt(location.params.id)}
        isVisible={true}
        size={300}
      />
    </>
  );
});
