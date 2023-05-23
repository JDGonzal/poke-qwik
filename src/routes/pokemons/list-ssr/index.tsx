import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  
  return <>Hola Mundo  - SSR</>
});

export const head: DocumentHead = {
  title: "List SSR",
};
