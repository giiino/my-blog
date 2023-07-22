import { serializeData } from '@/shared/utils/format'

const Home = ({ data }: any) => {
  return <p>home</p>
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
