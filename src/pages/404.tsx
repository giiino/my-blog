import { useEffect } from 'react'

import { useRouter } from 'next/router'

const Page404 = () => {
  const { replace } = useRouter()
  useEffect(() => {
    replace('/')
  }, [replace])

  return null
}

export default Page404
