interface CheckboxProps {
  isChecked: boolean
  onChecked: () => void
}

const Checkbox = ({ isChecked, onChecked }: CheckboxProps) => {
  return <input type="checkbox" checked={isChecked} onChange={onChecked}></input>
}

export default Checkbox
