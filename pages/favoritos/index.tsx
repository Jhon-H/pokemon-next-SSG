import { useContext } from 'react';

import { Layout } from '../../components/layouts/Layout';
import { Context } from '../../context/reducer';

import NoFavorites from '../../components/ui/NoFavorites';
import { FavoritePokemons } from '../../components/ui';


const FavoritePage = () => {
  const { favorites } = useContext(Context)

  return (
    (!favorites.length)
      ? <NoFavorites />
      : <FavoritePokemons favorites={favorites}/>
  )
}

FavoritePage.getLayout = function getLayout(child: React.ReactNode) {
  return (
    <Layout title='Pokémons - Favoritos'>
      {child}
    </Layout>
  )
}

export default FavoritePage
