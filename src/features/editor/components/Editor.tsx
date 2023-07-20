import 'react-markdown-editor-lite/lib/index.css'

import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import MarkdownIt from 'markdown-it'
import dynamic from 'next/dynamic'

import { TitleEditor } from './TitleEditor'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

export default function Editor() {
  const mdParser = new MarkdownIt()

  function handleEditorChange({ html, text }: any) {
    console.log('handleEditorChange', html, text)
  }

  return (
    <Stack sx={{ mt: 8 }}>
      <TitleEditor />
      <StyledMdEditor
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </Stack>
  )
}

const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 104px);
`
