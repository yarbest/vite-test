import { render } from '@testing-library/react';

import Button from '../Button';

// expect(element).toHaveTextContent(/react/i)

it('renders Button', () => {
  const { getByText } = render(<Button label="Click me" onClick={() => {}} />);
  expect(getByText('Click me')).toBeInTheDocument();
  expect(getByText('Click me')).toHaveTextContent('Click me');
});
