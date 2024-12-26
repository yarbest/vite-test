import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | string | undefined): string => {
  if (!error) return ''
  // this case will happen if in transformErrorResponse we return string
  if (typeof error === 'string') {
    return error
  }
  if ('status' in error) {
    return `Error: ${error.status}`
  }
  if ('message' in error) {
    return `Error: ${error.message}`
  }
  return 'Unknown error'
}
