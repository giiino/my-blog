import { useState } from 'react'

import { Stack, TextField } from '@mui/material'

const Tools = () => {
  const [text, setText] = useState('')

  const covertImageUrl = (target: string) => {
    const pattern = /d\/([^/]+)\/view/

    const matches = target.match(pattern)

    if (matches) {
      return `https://drive.google.com/uc?export=view&id=${matches[1]}`
    } else {
      return '未找到匹配的部分'
    }
  }

  return (
    <Stack>
      <h2>圖片轉換可用工具</h2>
      <TextField value={text} onChange={(e) => setText(e.target.value)} />
      <p>產生: {covertImageUrl(text)}</p>
    </Stack>
  )
}

export default Tools
