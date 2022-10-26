import React from 'react'
import { Grid } from '@nextui-org/react'
import { FavoriteCardPokemon }  from './FavoriteCardPokemon';

interface Props {
  favorites: {id: string; name:string;}[]
}

export const FavoritePokemons = ({ favorites }: Props) => {
  return (
    <Grid.Container gap={2} direction='row' justify='center'>
      {
        favorites.map((pokemon) => (
          <FavoriteCardPokemon {...pokemon} key={pokemon.id} />
        ))
      }
    </Grid.Container>
  )
}
 