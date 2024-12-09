import Button from '@containers/TodoList/components/Button'
import { render } from '@testing-library/react'

it('renders Button', () => {
  const { getByText } = render(
    <Button
      label="Click me"
      onClick={() => {
        return
      }}
    />,
  )
  expect(getByText('Click me')).toBeInTheDocument()
  expect(getByText('Click me')).toHaveTextContent('Click me')
})
