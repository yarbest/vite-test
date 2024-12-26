import { ListItemType, TodoFromAPI } from './types'

export const transformTodoFromApi = ({ completed, id, title }: TodoFromAPI): ListItemType => {
  return {
    id: id.toString(),
    text: title,
    isChecked: completed,
    isEditing: false,
  }
}
