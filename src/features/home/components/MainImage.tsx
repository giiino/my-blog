import styled from '@emotion/styled'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export const MainImage = () => {
  return (
    <Container>
      <Image
        src='https://i.ibb.co/4gXTppP/christmas-lights-3834926-1280.jpg'
        width='500'
        height='300'
        alt='首頁大圖'
        objectFit='center'
      />
      <EnterButton href={'/article'}>進入文章</EnterButton>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  img {
    width: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`

const EnterButton = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 35%;
  transform: translateX(-50%);
  align-items: center;
  appearance: none;
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #ff5a6d 0,
    #ff5454 100%
  );
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;

  &:focus {
    box-shadow: #ad2138 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #ad2138 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #ad2138 0 -3px 0 inset;
    /* transform: translateY(-2px); */
  }

  &:active {
    box-shadow: #ad2138 0 3px 7px inset;
    /* transform: translateY(2px); */
  }
`
