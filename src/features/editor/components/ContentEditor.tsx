import { styled } from '@mui/material/styles'
import MarkdownIt from 'markdown-it'
import dynamic from 'next/dynamic'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

interface ContentEditorProps {
  value: string
  onChange: ({ text }: { text: string }) => void
}

export function ContentEditor({ value, onChange }: ContentEditorProps) {
  const mdParser = new MarkdownIt()

  return (
    <StyledMdEditor
      value={value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
    />
  )
}

const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 104px);
`
