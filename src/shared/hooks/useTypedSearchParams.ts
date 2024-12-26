import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook to manage typed URL search parameters.
 * Pass your type as a generic parameter to get/set typed search parameters.
 */
export const useTypedSearchParams = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getTypedSearchParams = useCallback((): Partial<T> => {
    const params: Partial<T> = {}
    searchParams.forEach((value, key) => {
      params[key as keyof T] = value as T[keyof T]
    })
    return params
  }, [searchParams])

  const setTypedSearchParam = useCallback((params: Partial<T>) => {
    const newSearchParams = new URLSearchParams(searchParams)
    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, String(value))
    })
    setSearchParams(newSearchParams)
  }, [searchParams, setSearchParams])

  return { getTypedSearchParams, setTypedSearchParam }
}
