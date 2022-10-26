import {useContext, useMemo} from 'react';
import { useRouter } from 'next/router';

import type { GetStaticProps, GetStaticPaths} from 'next';
import type { PageProps, PokemonFull } from '../../interfaces';
import { pokeApi } from '../../api';
import { Context } from '../../context/reducer';

import confetti from 'canvas-confetti';

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

const PokemonPage: PageProps<Props> = ({ id, name, images }) => {
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const arrayWithPath = Array.from(Array(100).keys(), num => num + 1);

  const paths = arrayWithPath.map(value => ({
    params: { id: value.toString() }
  }));

  return {
    paths,
    fallback: true
  }
}

// Solo funciona en pages
// Se ejecuta en el servidor en tiempo de build (genera el HTML statico + JSON (los datos de las props))
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${params?.id}`)

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

export default PokemonPage
