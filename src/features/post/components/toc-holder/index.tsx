import { Fragment } from 'react'

import styled from '@emotion/styled'
import { Grid, GridProps } from '@mui/material'

import { useHeadings } from '@/shared/store/use-headings'
import { scrollBarHoverStyle } from '@/styles/globals'

import { useActiveHeading } from '../../hooks/use-headings'
import { ChildItems } from './child-items'
import { ListItem } from './list-item'

export const TocHolder = (props: GridProps) => {
  const { headings } = useHeadings()
  const activeHeadingId = useActiveHeading()

  return (
    <ListContainer {...props}>
      <ul>
        {headings.map((heading) => {
          return (
            <Fragment key={heading.id}>
              <ListItem
                key={heading.id}
                title={heading.title}
                id={heading.id}
                isActive={activeHeadingId === heading.id}
              />
              {heading.items.length > 0 && (
                <ChildItems
                  heading={heading.items}
                  activeHeadingId={activeHeadingId}
                />
              )}
            </Fragment>
          )
        })}
      </ul>
    </ListContainer>
  )
}

const ListContainer = styled(Grid)`
  position: sticky;
  top: 100px;
  max-height: 80vh;
  overflow-y: auto;
  align-self: flex-start;
  padding-left: 10px;
  li {
    font-size: 14px;
    margin-bottom: 13px;
    list-style: none;
    a {
      color: var(--color-menu-text);
      &:hover {
        color: var(--color-menu-hover-text);
      }
    }
  }
  ${scrollBarHoverStyle}
  @media screen and (max-width: 1100px) {
    display: none;
  }
`
