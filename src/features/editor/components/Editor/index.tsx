import Editor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

import { Markdown } from '@/shared/components/markdown'

import { SubmitPlugin } from './SubmitPlugin'

const MdEditor = dynamic(
  () => {
    return new Promise<typeof Editor>((resolve) => {
      import('react-markdown-editor-lite').then((res) => {
        const Editor = res.default
        Editor.use(SubmitPlugin)

        resolve(Editor)
      })
    })
  },
  {
    ssr: false
  }
)

interface ContentEditorProps {
  value: string
  onChange: ({ text }: { text: string }) => void
  onArticleInfoModalOpen: () => void
}

export function ContentEditor({
  value,
  onChange,
  onArticleInfoModalOpen
}: ContentEditorProps) {
  return (
    <StyledMdEditor
      value={value}
      renderHTML={(text) => (
        <Markdown style={{ color: '#000' }}>{text}</Markdown>
      )}
      onChange={onChange}
      config={{ onArticleInfoModalOpen }}
      htmlClass='editor'
    />
  )
}

const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 64px);
`
