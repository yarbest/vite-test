import { Provider } from 'react-redux'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'
import AuthProvider from './context/AuthProvider'
// import TodoList from '@containers/TodoList'

function fallbackRender({ error }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  console.log(error)

  return (
    <div role="alert">
      <p>
        Error
      </p>
    </div>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary fallbackRender={fallbackRender}>
            {/* <TodoList /> */}
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
