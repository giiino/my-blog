import styled from '@emotion/styled'
import { Lobster } from 'next/font/google'
import Link from 'next/link'

import { EnhancedImage } from '@/shared/components/lib/enhanced-image'

const notoSansTC = Lobster({ subsets: ['latin'], weight: '400' })

export const Banner = () => {
  return (
    <Container>
      <TitleSection style={{ zIndex: 1 }}>
        <h2 className={notoSansTC.className}>GN&ensp;DEV</h2>
      </TitleSection>
      <EnhancedImage
        src='/banner.jpg'
        alt='首頁大圖'
        imageWidth='100%'
        width={1500}
        height={800}
        ratio={0}
        style={{ height: '400px' }}
      />
      <EnterButton href={'/post'}>進入文章</EnterButton>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
  user-select: none;
  img {
    width: 100%;
    height: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`

const TitleSection = styled.div`
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  color: var(--primary-gray-100);
  text-align: center;
  h2 {
    font-size: 48px;
    text-shadow: 3px 0px 7px rgba(182, 143, 15, 0.8),
      -3px 0px 7px rgba(182, 143, 15, 0.8), 0px 4px 7px rgba(182, 143, 15, 0.8);
  }
  @media screen and (max-width: 760px) {
    h2 {
      font-size: 40px;
    }
  }
  @media screen and (max-width: 400px) {
    h2 {
      font-size: 35px;
    }
  }
`

const EnterButton = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 32%;
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
  }

  &:active {
    box-shadow: #ad2138 0 3px 7px inset;
  }

  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`
