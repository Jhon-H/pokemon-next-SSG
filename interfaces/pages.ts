import type { NextPage } from 'next';

export type PageProps<T = {}> =  NextPage<T> & {
  getLayout?: (child: React.ReactNode) => React.ReactNode,
}