import { ReactNode } from "react"

import Head from "next/head"

import { Navbar } from '../ui/Navbar';

type Props = {
  children: ReactNode,
  title?: string
}

const origin = (typeof window === 'undefined' ? '' : window.location.origin)

export const Layout = ({ children, title = 'PokemonApp' }: Props) => {


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Jhon" />
        <meta name="description" content={`${title}`} />
        <meta name="keywords" content={`${title}, pokedex`} />
        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main */}
      <main style={{
        padding: '0px 20px'
      }}>
        {children}
      </main>
    </>
  )
}
