import { getUserInfo } from '@/services/user'

const Home = ({ data }: any) => {
  console.log(data)
  return (
    <div>
      <p>Home</p>
      <a href='#'>github login</a>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const data = await getUserInfo()
  return {
    props: {
      data: JSON.parse(JSON.stringify(data))
    }
  }
}
