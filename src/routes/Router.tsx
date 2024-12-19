import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import TodoPage from '@pages/TodoPage'

import LazyLoad from './LazyLoadComponent'
import NotFound from './NotFound'
import { paths } from './paths'
import PrivateRoute from './PrivateRoute'

const TodosPage = LazyLoad(lazy(() => import('@pages/TodosPage')))
const LoginPage = LazyLoad(lazy(() => import('@pages/LoginPage')))

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
    path: paths.todo,
    element: (
      <PrivateRoute>
        <TodoPage />
      </PrivateRoute>
    ),
  },
  {
    path: paths.root,
    element: <Navigate to={paths.todos} replace />,
  },
  {
    path: '*',
    element: <Navigate to={paths.notFound} replace />,
  },
]

export default function Router() {
  return useRoutes([...privateRoutes, ...publicRoutes])
}
