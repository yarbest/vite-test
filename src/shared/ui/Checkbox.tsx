import styles from './styles.module.scss'

interface CheckboxProps {
  isChecked: boolean
  onChecked: () => void
}

const Checkbox = ({ isChecked, onChecked }: CheckboxProps) => {
  return <input className={styles.checkbox} type="checkbox" checked={isChecked} onChange={onChecked}></input>
}

export default Checkbox
