import { useState, useEffect } from 'react'

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue || ''))
      }
    }

    addEventListener('storage', handleStorageChange)

    return () => {
      removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue]
}

export default useLocalStorage
