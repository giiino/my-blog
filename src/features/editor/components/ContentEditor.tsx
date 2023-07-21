import 'react-markdown-editor-lite/lib/index.css'

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

  // mdParser.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  //   const token = tokens[idx]

  //   const marginStyle = `margin: 2px 0`

  //   // 返回自定义的开头标签
  //   return `<${token.tag} style="${marginStyle}">`
  // }

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
