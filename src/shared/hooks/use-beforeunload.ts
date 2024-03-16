import { useEffect } from 'react'

interface useBeforeunloadOptions {
  disabled?: boolean
}

export const useBeforeunload = ({ disabled }: useBeforeunloadOptions = {}) => {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (disabled !== undefined && disabled) return
      const confirmMessage = '已編輯的表單內容將會遺失'
      e.returnValue = confirmMessage
      return confirmMessage
    }
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [disabled])
}
