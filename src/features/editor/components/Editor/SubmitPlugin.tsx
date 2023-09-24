import { PluginProps } from 'react-markdown-editor-lite'

import SaveAltIcon from '@mui/icons-material/SaveAlt'

export const SubmitPlugin = ({ editor }: PluginProps) => {
  const { onArticleInfoModalOpen } = editor.props.config
  return (
    <span className='button' title='submit' onClick={onArticleInfoModalOpen}>
      <SaveAltIcon fontSize='small' sx={{ mt: 0.3 }} />
    </span>
  )
}

SubmitPlugin.align = 'right'
SubmitPlugin.pluginName = 'submit'
