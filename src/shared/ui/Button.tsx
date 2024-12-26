interface ButtonProps {
  onClick: () => void
  label: string
  testId?: string
}

const Button = ({ label, onClick, testId }: ButtonProps) => {
  return <button data-testid={testId} onClick={onClick}>{label}</button>
}

export default Button
