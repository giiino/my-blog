import { Button } from '@mui/material'
import { useRouter } from 'next/router'

import { serializeData } from '@/shared/utils/format'

const Home = ({ data }: any) => {
  const { push } = useRouter()
  return (
    <p>
      <Button onClick={() => push('/article/64baaf42a117d6a94cde65f9')}>
        Blog
      </Button>
    </p>
  )
}

export default Home

export async function getStaticProps() {
  // const data = await getUserInfo()
  const data = 5
  return {
    props: {
      data: serializeData(data)
    }
  }
}
