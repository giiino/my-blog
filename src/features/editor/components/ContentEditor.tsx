import 'react-markdown-editor-lite/lib/index.css'

import styled from '@emotion/styled'
import MarkdownIt from 'markdown-it'
import dynamic from 'next/dynamic'

import { Markdown } from '@/shared/components/Markdown'

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
      renderHTML={(text) => <Markdown>{text}</Markdown>}
      onChange={onChange}
      htmlClass='editor'
    />
  )
}

const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 104px);
`
