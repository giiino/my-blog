import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'

export const ToTopButton = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop

      if (currentScrollTop < lastScrollTop && currentScrollTop > 300) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  if (!isShow) return null

  const handleClick = () => scrollTo(0, 0)

  return (
    <Container onClick={handleClick}>
      <KeyboardArrowUpIcon />
    </Container>
  )
}

const Container = styled(IconButton)`
  position: fixed;
  right: 30px;
  bottom: 7vh;
  background: #e2e2e2b1;
`
