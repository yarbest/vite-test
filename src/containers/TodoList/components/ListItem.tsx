import { ListItemType } from '..'
import Checkbox from './Checkbox'

interface ListItemProps {
  listItem: ListItemType
  onChecked: (id: string) => void
}

const ListItem = ({ listItem, onChecked }: ListItemProps) => {
  return (
    <li>
      <Checkbox
        listItemId={listItem.id}
        isChecked={listItem.isChecked}
        onChecked={onChecked}
      />

      {listItem.text}
    </li>
  )
}

export default ListItem
