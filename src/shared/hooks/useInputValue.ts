import React, { useCallback, useState } from 'react'

export const useInputValue = () => {
  const [inputValue, setInputValue] = useState('')
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  return { inputValue, handleChange, setInputValue }
}
