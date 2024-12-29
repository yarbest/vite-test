import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import LazyLoad from './LazyLoadComponent'
import NotFound from './NotFound'
import { paths } from './paths'
import PrivateRoute from './PrivateRoute'

const TodoPage = LazyLoad(lazy(() => import('@pages/TodoPage/TodoPage')))
const TodosPage = LazyLoad(lazy(() => import('@features/TodoFeature/TodoFeature')))
const LoginPage = LazyLoad(lazy(() => import('@pages/LoginPage/LoginPage')))

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
