import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import styles from './App.module.scss'
import TodoList from '@containers/TodoList'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

console.log(import.meta.env)

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
  const [count, setCount] = useState(0)
  return (
    <>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <TodoList />
      </ErrorBoundary>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={`${styles.logo} ${styles.react}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={() => setCount(count => count + 1)}>
          count is
          {count}
        </button>
        <p>
          Edit
          <code>src/App.tsx</code>
          and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
