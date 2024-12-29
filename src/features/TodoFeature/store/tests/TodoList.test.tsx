import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import TodosPage from '@features/TodoFeature/TodoFeature'
import { store } from 'src/store'

import { mockDataFromApi } from './mocks'

function wrapper({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  )
}

describe('TodosPage', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('should render fetched todo', async () => {
    render(
      <TodosPage />,
      { wrapper },
    )

    fetchMock.mockResponse(() => Promise.resolve({
      status: 200,
      body: JSON.stringify(mockDataFromApi),
    }))

    const searchInputForm = screen.getByTestId<HTMLInputElement>('search-input-form') // or { getByTestId }=render()
    const searchButtonForm = screen.getByTestId<HTMLButtonElement>('search-button-form')
    expect(searchInputForm).toBeInTheDocument()// screen.debug(searchInputForm)

    await userEvent.type(searchInputForm, '1') // search-input-form type is number, so only number can be typed
    expect(searchInputForm.value).toBe('1')

    await userEvent.click(searchButtonForm)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(screen.getByText(mockDataFromApi.title)).toBeInTheDocument()
  })

  it('should show error when fetching non existing todo', async () => {
    render(
      <TodosPage />,
      { wrapper },
    )

    fetchMock.mockResponse(() => Promise.resolve({ status: 404 }))

    const searchInputForm = screen.getByTestId<HTMLInputElement>('search-input-form')
    const searchButtonForm = screen.getByTestId<HTMLButtonElement>('search-button-form')
    expect(searchInputForm).toBeInTheDocument()

    await userEvent.type(searchInputForm, '1')
    expect(searchInputForm.value).toBe('1')

    await userEvent.click(searchButtonForm)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Todo with id: 1, not found')).toBeInTheDocument()
  })
})
