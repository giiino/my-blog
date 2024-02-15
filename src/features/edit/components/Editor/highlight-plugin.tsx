import { PluginProps } from 'react-markdown-editor-lite'

import HighlightIcon from '@mui/icons-material/Highlight'

export const HighlightPlugin = ({ editor }: PluginProps) => {
  const { insertMarkdown, insertText } = editor

  return (
    <span className='button' title='highlight'>
      <HighlightIcon fontSize='small' sx={{ mt: 0.3 }} />
    </span>
  )
}

HighlightPlugin.align = 'left'
HighlightPlugin.pluginName = 'highlight'
