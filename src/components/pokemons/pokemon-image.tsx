import { component$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?:number;
  backImage?: boolean;
}

export const PokemonImage = component$(({id, size=100, backImage=false}: Props)=>{ //Desestructuro el valor de props
  let imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  backImage? imageUrl=`${imageUrl}/back/${id}.png`:
  imageUrl = `${imageUrl}${id}.png`;
  return(
    <img
        src={imageUrl}
        width={size}
        height={size}
        alt="a Pokemon"
      />
  )
})