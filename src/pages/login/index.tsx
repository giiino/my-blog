import styled from '@emotion/styled'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Stack } from '@mui/material'

import { LOGIN_GITHUB_URL } from '@/shared/constants/auth'

const Login = () => {
  return (
    <Container>
      <LoginButton href={LOGIN_GITHUB_URL}>
        <GitHubIcon sx={{ mr: 1 }} />
        <span>登入</span>
      </LoginButton>
    </Container>
  )
}

export default Login

const Container = styled(Stack)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
`

const LoginButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans',
    sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;

  &:hover,
  &:focus {
    background-color: #07c;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
  }

  &:active {
    background-color: #0064bd;
    box-shadow: none;
  }
`
