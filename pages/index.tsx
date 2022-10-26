import type { NextPage, GetStaticProps } from 'next'

import pokeApi from '../api/pokeApi';
import { Pokemon, PokemonListResponse, PageProps } from '../interfaces';

import { Grid, Card, Row, Text } from '@nextui-org/react'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon/PokemonCard'

type Props = {
  pokemons: Pokemon[]
}

const Home: PageProps<Props> = ({ pokemons }) => (
  <Grid.Container gap={2} justify='flex-start'>
    {
      pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))
    }
  </Grid.Container>
)


Home.getLayout = function getLayout(child: React.ReactNode) {
  return (
    <Layout title='Listado de pokemons'>
      {child}
    </Layout>
  )
}

// Solo funciona en pages
// Se ejecuta en el servidor en tiempo de build (genera el HTML statico + JSON (los datos de las props))
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  const imgUrl = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`

  const pokemons: Pokemon[] = data.results.map((props, index) => ({
    id: index + 1,
    img: imgUrl(index + 1),
    ...props,
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default Home
