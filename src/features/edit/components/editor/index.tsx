import Editor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

import { Markdown } from '@/shared/components/markdown'

import { useUploadImage } from '../../hooks/use-mutations'
import { HighlightPlugin } from './highlight-plugin'
import { SubmitPlugin } from './submit-plugin'

const MdEditor = dynamic(
  () => {
    return new Promise<typeof Editor>((resolve) => {
      import('react-markdown-editor-lite').then((res) => {
        const Editor = res.default
        Editor.use(SubmitPlugin)
        Editor.use(HighlightPlugin)

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
  onPostInfoModalOpen: () => void
}

export function ContentEditor({
  value,
  onChange,
  onPostInfoModalOpen
}: ContentEditorProps) {
  const { mutateAsync: upload } = useUploadImage()

  const handleImageUpload = async (file: File) => {
    const {
      data: {
        data: { url }
      }
    } = await upload(file)
    return Promise.resolve(url)
  }

  return (
    <StyledMdEditor
      value={value}
      renderHTML={(text) => (
        <Markdown style={{ color: '#000' }}>{text}</Markdown>
      )}
      onChange={onChange}
      config={{ onPostInfoModalOpen }}
      onImageUpload={handleImageUpload}
      allowPasteImage
      htmlClass='editor'
    />
  )
}

const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 64px);
`
