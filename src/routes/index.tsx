import { $, component$, useContext } from "@builder.io/qwik";
import {
  useNavigate,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  // const pokemonId = useSignal(1); // primitivos, boleans, strings, etc
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(false);
  const pokemonGame = useContext( PokemonGameContext);

  const changePokemonId = $((value: number) => {
    //pokemonGame.isPokemonVisible = false;
    if (value === 0) {
      pokemonGame.showBackImage = !pokemonGame.showBackImage;
      return;
    }
    if (pokemonGame.pokemonId + value <= 0) return;
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          size={200}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>
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
            pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
          }}
          class="btn btn-primary mr-2"
        >
          {!pokemonGame.isPokemonVisible?"Revelar":"Ocultar"}
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
