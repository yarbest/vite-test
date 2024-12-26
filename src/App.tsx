import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { AuthProvider } from './context/auth'
import { Router } from './routes'
import { persistor, store } from './store'

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
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary fallbackRender={fallbackRender}>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
