import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import NotFound from './NotFound'
import { paths } from './paths'
import LazyLoad from './LazyLoadComponent'
import PrivateRoute from './PrivateRoute'

// todo: replace path to "page" from container
const TodosPage = LazyLoad(lazy(() => import('@containers/TodoList')))
const LoginPage = LazyLoad(lazy(() => import('src/pages/LoginPage')))

const publicRoutes: RouteObject[] = [
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.notFound,
    element: <NotFound />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: paths.todos,
    element: (
      <PrivateRoute>
        <TodosPage />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to={paths.notFound} replace />,
  },
]

export default function Router() {
  return useRoutes([...privateRoutes, ...publicRoutes])
}
