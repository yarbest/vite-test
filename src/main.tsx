import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Mount happens 2 times because of StrictMode
  // <StrictMode>
  <App />,
  // </StrictMode>,
)
