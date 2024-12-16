import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

import { ListItemType, TodoFromAPI } from './types'

export const transformTodoFromApi = ({ completed, id, title }: TodoFromAPI): ListItemType => {
  return {
    id: id.toString(),
    text: title,
    isChecked: completed,
    isEditing: false,
  }
}

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
