import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

import { Menu } from '@/features/post/components'
import { useMenuCategory } from '@/shared/hooks/use-queries'
import { scrollBarHoverStyle } from '@/styles/globals'

interface MenuProps extends GridProps {}

export function PostMenu({ ...props }: MenuProps) {
  const { data: menuCategories } = useMenuCategory()
  return (
    <MenuWrapper {...props}>
      <Menu menuCategories={menuCategories || []} />
    </MenuWrapper>
  )
}

const MenuWrapper = styled(Grid)`
  position: sticky;
  top: 100px;
  align-self: flex-start;
  font-size: 14px;
  overflow-y: auto;
  max-height: 80vh;
  padding-right: 10px;
  ${scrollBarHoverStyle}
  @media screen and (max-width: 960px) {
    display: none;
  }
`
