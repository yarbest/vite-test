interface ButtonProps {
  onClick: () => void
  label: string
}

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>
}

export default Button
