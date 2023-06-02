import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, type PokemonGameState } from '../context/';


export default component$(() => {
  useStyles$(styles);

  const pokemonGameIni = useStore<PokemonGameState>({
    pokemonId:4,
    showBackImage:false,
    isPokemonVisible:true,
  });

  useContextProvider( PokemonGameContext, pokemonGameIni);

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
