import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface Favorite {
  id: string;
  name: string;
}

interface ContextProps {
  favorites: Favorite[],
  toogleFavorite: (id: string, name: string) => void;
  isFavorite: (id: string) => boolean;
}

export const Context = createContext<ContextProps>({} as ContextProps)

type Props = {
  children: ReactNode
}

export const ContextProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const firstRender = useRef(true)

  const isFavorite = (id: string): boolean => {
    const alreadyFavorite = favorites.some(({ id: idPokemon }) => id === idPokemon)
    return alreadyFavorite
  }

  const toogleFavorite = (id: string, name: string) => {

    if (isFavorite(id)) {
      const filterPokemon = favorites.filter(({ id: idPokemon }) => idPokemon !== id);
      setFavorites([...filterPokemon]);

    } else {
      setFavorites([
        ...favorites,
        {id, name}
      ])
    }
  }

  useEffect(() => {
    const stringFavorites = localStorage.getItem('favorites') || "[]";
    const favorites = JSON.parse(stringFavorites)

    setFavorites(favorites);
  }, [])

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    }
  }, [])

  return (
    <Context.Provider value={{
      favorites,
      toogleFavorite,
      isFavorite
    }}>
      {children}
    </Context.Provider>
  )
}
