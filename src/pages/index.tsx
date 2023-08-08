import { Button } from '@mui/material'
import { useRouter } from 'next/router'

import { Banner } from '@/features/home/components/Banner'
import { serializeData } from '@/shared/utils/format'

const Home = ({ data }: any) => {
  const { push } = useRouter()
  return (
    <>
      <Banner />
    </>
  )
}

export default Home

// export async function getStaticProps() {
//   // const data = await getUserInfo()
//   const data = 5
//   return {
//     props: {
//       data: serializeData(data)
//     }
//   }
// }
