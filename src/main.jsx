import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DifferApp from './DifferApp'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DifferApp />
  </StrictMode>,
)
