import styled from '@emotion/styled'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useRouter } from 'next/router'

import * as constants from '@/shared/constants/ui'

const Footer = () => {
  const { pathname } = useRouter()

  if (pathname.includes('edit')) {
    return null
  }

  return (
    <BoxWrapper component={'footer'}>
      <InfoWrapper>
        <RoutesWrapper>
          <Link href={'/'}>首頁</Link>
          <Link href={'/post'}>文章</Link>
        </RoutesWrapper>
        <Icons>
          <Link href={constants.MY_GITHUB_URL}>
            <GitHubIcon fontSize='large' />
          </Link>
          <Link href={constants.MY_MAIL}>
            <EmailIcon fontSize='large' />
          </Link>
        </Icons>
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} by giiino. All rights reserved.
        </Typography>
      </InfoWrapper>
    </BoxWrapper>
  )
}

export default Footer

const BoxWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45vh;
  background-color: var(--color-footer-bg);
  color: var(--color-text);
  border-top: var(--color-footer-border-top);
  user-select: none;
`

const InfoWrapper = styled(Stack)`
  width: 90%;
  max-width: 800px;
`

const RoutesWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  font-size: 18px;
  gap: 15px;
  a {
    color: var(--color-footer-link);
    &:hover {
      text-decoration: underline;
    }
  }
`

const Icons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 15px;
  .MuiSvgIcon-root {
    font-size: 30px;
    cursor: pointer;
  }
  a {
    color: var(--color-footer-link);
  }
`
