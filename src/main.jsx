import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { InternshipProvider } from './context/InternshipContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InternshipProvider>
        <App />
      </InternshipProvider>
    </AuthProvider>
  </StrictMode>,
)
