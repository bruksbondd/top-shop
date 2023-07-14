import React, { useState } from 'react'
import { Button, Htag, P, Rating, Tag } from '../components'
import { withLayout } from '../layout/Layout'
import { GetServerSideProps, GetStaticProps } from 'next'
import { MenuItem } from '@/interfaces/menu.interface'
import axios from 'axios'

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  console.log('menu', menu)
  return (
    <>
      <Htag tag='h1'>Заголовок</Htag>
      <Button appearance='primary' arrow='right'>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='down'>
        Кнопка
      </Button>
      <P size='l'>Большой</P>
      <P>Средний</P>
      <P size='s'>Маленький</P>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>
        Red
      </Tag>
      <Tag size='s' color='green'>
        Green
      </Tag>
      <Tag color='primary'>Green</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />

      <ul>
        {/* {menu?.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))} */}
      </ul>
    </>
  )
}

export default withLayout(Home)

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
