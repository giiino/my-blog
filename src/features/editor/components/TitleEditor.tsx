import { ChangeEvent, ReactNode } from 'react'

import styled from '@emotion/styled'
import { Autocomplete, InputBase, Stack, TextField } from '@mui/material'

import { useCategories } from '../hooks/use-queries'

interface TitleEditorProps {
  title: string
  category: string
  submitButton: ReactNode
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (_: unknown, value: string | null) => void
}

export const TitleEditor = ({
  title,
  category,
  submitButton,
  onTitleChange,
  onCategoryChange
}: TitleEditorProps) => {
  const { data: categories } = useCategories()
  return (
    <Stack direction='row' sx={{ height: '40px' }}>
      <Stack direction='row' sx={{ flexGrow: 1 }}>
        <Autocomplete
          disablePortal
          freeSolo
          value={category}
          options={categories || []}
          sx={{ width: 300 }}
          placeholder='分類'
          size='small'
          onInputChange={onCategoryChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TitleInput
          value={title}
          size='small'
          placeholder='請填入標題'
          onChange={onTitleChange}
        />
        {submitButton}
      </Stack>
    </Stack>
  )
}

const TitleInput = styled(InputBase)`
  flex-grow: 1;
  padding: 0 10px;
  input {
    padding: 0;
  }
`
