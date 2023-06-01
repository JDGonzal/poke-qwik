import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id=0, size = 100, backImage = false, isVisible = false }: Props) => {
    //Desestructuro el valor de props

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() =>{
      return backImage
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <span
          class={{
            hidden: imageLoaded.value,
          }}>
          Loading...
        </span>
        <img
          src={imageUrl.value}
          width={size}
          height={size}
          alt="a Pokemon"
          onLoad$={() => {
            setTimeout(() => {
              imageLoaded.value = true;
            }, 200);
          }}
          class={[
            {
              hidden: !imageLoaded.value,
              "brightness-0": !isVisible,
            },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);
