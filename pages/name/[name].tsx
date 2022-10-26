import { useContext, useMemo } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import confetti from 'canvas-confetti';

import { PageProps, PokemonListResponse } from '../../interfaces';
import { PokemonFull } from '../../interfaces/pokemon-full';
import { Context } from '../../context/reducer';
import { pokeApi } from '../../api';

import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react'
import { Layout } from '../../components/layouts';

interface Props {
  id: string;
  name: string;
  images: {
    imgPrimary: string;
    imgFront: string;
    imgBack: string;
    imgShinyFront: string;
    imgShinyBack: string;
  }
}

const PokemonByNamePage: PageProps<Props> = ({ id, name, images }) => {
  const router = useRouter()
  const { toogleFavorite, isFavorite, favorites } = useContext(Context)

  const alreadyFavorite = useMemo(() => isFavorite(id), [favorites, id, isFavorite]);

  const onToggleFavorite = () => {
    toogleFavorite(id, name)

    if (!alreadyFavorite) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -160,
        origin: {
          x: 1,
          y: 0
        }
      })
    }
  }

  if (router.isFallback) {
    return <div>...Loading</div>
  }

  return (
    <Layout title={name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 }>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={images.imgPrimary}
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{name}</Text>

              <Button
                color="gradient"
                ghost={!alreadyFavorite}
                onPress={onToggleFavorite}
              >
                { (alreadyFavorite) ? 'Quitar de' : 'Guardar en' } favoritos
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites: </Text>

              <Container direction='row' display='flex' gap={0}>
                {
                  Object.entries(images).map(([type, value]) => (
                    (type === 'imgPrimary')
                      ? null
                      : (
                        <Image
                          key={type}
                          src={value}
                          alt={name}
                          width={100}
                          height={100}
                        />
                      )
                  ))
                }
              </Container>

            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=50')
  
  const namesOfPokemons = data.results.map(({ name }) => name)

  console.log(namesOfPokemons)

  const paths = namesOfPokemons.map((name) => ({
    params: { name: name }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${params?.name}`)

    return {
      props: {
        id: data.id,
        name: data.name,
        images: {
          imgPrimary: data.sprites.other?.dream_world.front_default || 'fallback_images',
          imgFront: data.sprites.front_default,
          imgBack: data.sprites.back_default,
          imgShinyFront: data.sprites.front_shiny,
          imgShinyBack: data.sprites.back_shiny,
        }
      }
    }
  } catch(e) {
    return {
      notFound: true
    }
  }
}


export default PokemonByNamePage