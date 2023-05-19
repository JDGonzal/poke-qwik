import { component$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?:number;
  isBack?: boolean;
}

export const PokemonImage = component$(({id, size=100, isBack=false}: Props)=>{ //Desestructuro el valor de props
  let src='';
  isBack? src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`:
  src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return(
    <img
        src={src}
        width={size}
        height={size}
        alt="a Pokemon"
      />
  )
})