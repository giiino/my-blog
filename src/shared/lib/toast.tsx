import reactHotToast, { ToastOptions } from 'react-hot-toast'

import WarningIcon from '@mui/icons-material/Warning'

const toast = {
  ...reactHotToast,
  warn: (message: string, options?: ToastOptions) => {
    reactHotToast(message, {
      icon: <WarningIcon color='warning' />,
      style: {
        whiteSpace: 'pre-line',
        wordBreak: 'break-word'
      },
      id: 'warning-toast',
      ...options
    })
  },
  error: (message: string, options?: ToastOptions) => {
    reactHotToast.error(message, { id: 'error-toast', ...options })
  },
  success: (message: string, options?: ToastOptions) => {
    reactHotToast.success(message, { id: 'success-toast', ...options })
  }
}
export * from 'react-hot-toast'
export default toast
