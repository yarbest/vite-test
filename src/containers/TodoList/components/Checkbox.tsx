interface CheckboxProps {
  isChecked: boolean;
  listItemId: string;
  onChecked: (id: string) => void
}

const Checkbox = ({ isChecked, listItemId, onChecked }: CheckboxProps) => {
  return <input type="checkbox" checked={isChecked} onChange={() => onChecked(listItemId)}></input>;
};

export default Checkbox;
