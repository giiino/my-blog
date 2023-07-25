import { ChangeEvent, ReactNode } from 'react'

import styled from '@emotion/styled'
import { Autocomplete, InputBase, Stack, TextField } from '@mui/material'

interface TitleEditorProps {
  title: string
  category: string
  submitButton: ReactNode
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (_: unknown, value: string | null) => void
}

export const TitleEditor = ({
  title,
  submitButton,
  onTitleChange,
  onCategoryChange
}: TitleEditorProps) => {
  return (
    <Stack direction='row' sx={{ height: '40px' }}>
      <Stack direction='row' sx={{ flexGrow: 1 }}>
        <Autocomplete
          disablePortal
          options={testArr}
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

const testArr = ['88', '55']
