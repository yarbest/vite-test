import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ListItemType, TodoFromAPI } from '../types'
import { transformTodoFromApi } from '../utils'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: builder => ({
    getTodoById: builder.query<ListItemType, number>({
      query: id => `todos/${id}`,
      // allows to transform TodoFromAPI to our ListItemType
      transformResponse: (value: TodoFromAPI) => transformTodoFromApi(value),
      // this would allow to have a clear message in action.payload in slice
      // and in generated hook, field error
      transformErrorResponse: (error): string => {
        if (error.status === 404) {
          return 'Todo not found'
        }
        return 'Couldn\'t load todo'
      },
    }),
  }),

})

export const { useGetTodoByIdQuery, useLazyGetTodoByIdQuery } = todoApi
