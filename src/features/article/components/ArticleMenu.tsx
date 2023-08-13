import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

import { Menu } from '@/shared/components/Menu'
import { MenuCategoriesResponse } from '@/shared/types/api/article'
import { scrollBarHoverStyle } from '@/styles/globals'

interface MenuProps extends GridProps {
  menuCategories: MenuCategoriesResponse[]
}

export function ArticleMenu({ menuCategories, ...props }: MenuProps) {
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
