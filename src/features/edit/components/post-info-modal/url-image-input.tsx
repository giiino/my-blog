import styled from '@emotion/styled'
import { Autocomplete, Box, Stack, StackProps, TextField } from '@mui/material'
import Image from 'next/image'

import { useConverImages } from '../../hooks/use-queries'
import { ValueKeys, useFormikContext } from '../edit-formik'

interface UrlImageInputProps extends StackProps {}

export const UrlImageInput = (props: UrlImageInputProps) => {
  const { values, setFieldValue } = useFormikContext()
  const { data: converImagesList } = useConverImages()

  return (
    <Stack {...props}>
      <Autocomplete
        disablePortal
        disableClearable
        freeSolo
        options={converImagesList || []}
        size='small'
        ListboxProps={{ style: { maxHeight: '200px' } }}
        onInputChange={(_, value) => setFieldValue(ValueKeys['封面'], value)}
        value={values.coverImage}
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            <OptionImage width='50' height='50' src={option} alt='封面圖' />
            <span style={{ wordBreak: 'break-word' }}>{option}</span>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='封面圖(外部連結)'
            variant='standard'
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </Stack>
  )
}

const OptionImage = styled(Image)`
  object-fit: contain;
  border: 1px solid #ccc;
  background: #fff;
  margin-right: 20px;
`
