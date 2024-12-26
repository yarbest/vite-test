import { Navigate, useParams } from 'react-router-dom'

import { selectListItems } from '@pages/TodosPage/store/selectors'
import { paths } from 'src/routes'
import { useAppSelector } from 'src/store'

interface TodoPageParams extends Record<string, string | undefined> {
  id: string
}

const TodoPage = () => {
  const listItems = useAppSelector(selectListItems)
  const { id } = useParams<TodoPageParams>()
  const isIdInListItems = listItems.some(listItem => listItem.id === id)

  if (!isIdInListItems) return <Navigate to={paths.notFound} replace />

  return (
    <div>
      todo page:
      {' '}
      {id}
    </div>
  )
}

export default TodoPage
