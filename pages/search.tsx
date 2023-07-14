import { GetStaticProps } from 'next'
import React from 'react'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface'

function Search(): JSX.Element {
  return <>Search</>
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
      {
        firstCategory,
      }
    )

    if (menu.length == 0) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        menu,
        firstCategory,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
