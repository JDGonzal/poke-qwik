import {$, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter =( initialValue: number) =>{

  const counter = useSignal(initialValue);

  const increaseCounter =$(()=>{
    counter.value+=1;
  });

  const decreaseCounter =$(()=>{
    counter.value-=1;
  });

  return {
    increaseCounter,
    decreaseCounter,
    counter: useComputed$(() => counter.value), //read-only signal
  };
}
