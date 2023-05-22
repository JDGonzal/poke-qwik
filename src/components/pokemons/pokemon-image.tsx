import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 100, backImage = false, isVisible = false }: Props) => {
    //Desestructuro el valor de props

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    let imageUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    backImage
      ? (imageUrl = `${imageUrl}/back/${id}.png`)
      : (imageUrl = `${imageUrl}${id}.png`);

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <span
          class={{
            hidden: imageLoaded.value,
          }}
        >
          Loading...
        </span>
        <img
          src={imageUrl}
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
