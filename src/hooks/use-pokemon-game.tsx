import { useComputed$, useContext, $ } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    //pokemonGame.isPokemonVisible = false;
    if (value === 0) {
      pokemonGame.showBackImage = !pokemonGame.showBackImage;
      return;
    }
    if (pokemonGame.pokemonId + value <= 0) return;
    pokemonGame.pokemonId += value;
  });

  const toggleVisible =$(()=>{
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  })

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    
    nextPokemon: $(()=>changePokemonId(+1)),
    prevPokemon: $(()=>changePokemonId(-1)),
    spinPokemon: $(()=>changePokemonId(0)),
    showPokemon: toggleVisible,
  };
};
