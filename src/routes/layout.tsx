import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, PokemonListContext } from '../context/';
import type { PokemonGameState, PokemonListState } from '../context/';


export default component$(() => {
  useStyles$(styles);

  const pokemonGameIni = useStore<PokemonGameState>({
    pokemonId:1,
    showBackImage:false,
    isPokemonVisible:true,
  });

  useContextProvider( PokemonGameContext, pokemonGameIni);

  const pokemonListini = useStore<PokemonListState>({
    currentPage:0,
    isLoading:false,
    pokemons:[],
    isEnd:false,
  })

  useContextProvider(PokemonListContext, pokemonListini);

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
