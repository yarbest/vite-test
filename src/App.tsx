import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AuthProvider from './context/auth/AuthProvider'
import Router from './routes/Router'
import { store } from './store'

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
