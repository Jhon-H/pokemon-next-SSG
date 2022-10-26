import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { NextUIProvider } from '@nextui-org/react'

import { darkTheme } from '../theme'

import { ContextProvider } from '../context/reducer'
import '../styles/globals.css'

type NextPagePropsWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode
}

type NextAppPropsWithLayout = AppProps & {
  Component: NextPagePropsWithLayout
}

function MyApp({ Component, pageProps }: NextAppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)

  return(
    <NextUIProvider theme={darkTheme}>
      <ContextProvider>
        {getLayout(
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </NextUIProvider>
  )
}

export default MyApp
