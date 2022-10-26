import { Grid, Card, Text } from '@nextui-org/react'
import { useRouter } from 'next/router';

interface Props {
  id: string;
  name: string;
}

export const FavoriteCardPokemon = ({ id, name }: Props) => {
  const router = useRouter()

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid xs={6} sm={3} xl={1} key={id}>
      <Card isHoverable isPressable css={{ padding: 10 }} onPress={onFavoriteClicked}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width='100%'
          height={140}
          />
        <Text h2>{name}</Text>
      </Card>
    </Grid>
  )
}
