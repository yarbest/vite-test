import { render } from '@testing-library/react'

import Button from '../Button'

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
