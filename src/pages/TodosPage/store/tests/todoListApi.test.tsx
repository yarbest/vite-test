import { act, renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { TodoFromAPI } from '@pages/TodosPage/types'
import { store } from 'src/store'

import { useLazyGetTodoByIdQuery } from '../todoService'

function wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

it('handles getTodoById fulfilled action', async () => {
  const todoId = 1

  const mockDataFromApi: TodoFromAPI = {
    userId: 1,
    id: todoId,
    title: '123',
    completed: true,
  }
  fetchMock.mockOnceIf(`https://jsonplaceholder.typicode.com/todos/${todoId}`, () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify(mockDataFromApi),
    }),
  )

  const { result, rerender } = renderHook(() => useLazyGetTodoByIdQuery(), {
    wrapper,
  })

  // result.current - is what hook returns
  // since useLazy returns a trigger funcion, and starts only after calling it, we need to call it here
  const triggerGetTodoById = result.current[0]

  // act is used to ensure that all updates related to rendering, state updates
  // are applied before making assertions in tests This ensures the same behavior the user would see in the browser
  act(() => {
    void triggerGetTodoById(todoId)
  })

  rerender() // without rerender, we won't see the changes in the hook, so status will be still 'uninitialized'
  expect(result.current[1]).toMatchObject({
    status: 'pending',
    isLoading: true,
  })

  // waiting for the fetch to be called
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

  // no need to wait it here, cause it was waited above
  expect(result.current[1]).toMatchObject({
    status: 'fulfilled',
    data: {
      id: todoId.toString(),
      text: mockDataFromApi.title,
      isChecked: mockDataFromApi.completed,
      isEditing: false,
    },
    isSuccess: true,
  })
})
