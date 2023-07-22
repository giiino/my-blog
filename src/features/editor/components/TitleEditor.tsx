import { ChangeEvent } from 'react'

import SaveAltIcon from '@mui/icons-material/SaveAlt'
import {
  Autocomplete,
  IconButton,
  InputBase,
  Stack,
  TextField
} from '@mui/material'
import { styled } from '@mui/material/styles'

interface TitleEditorProps {
  title: string
  category: string
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCategoryChange: (_: unknown, value: string | null) => void
  handleSubmit: () => void
}

export const TitleEditor = ({
  title,
  onTitleChange,
  onCategoryChange,
  handleSubmit
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
      </Stack>
      <IconButton
        color='info'
        sx={{ p: '10px' }}
        size='small'
        onClick={handleSubmit}
      >
        <SaveAltIcon />
      </IconButton>
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
