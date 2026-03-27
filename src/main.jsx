import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { InternshipProvider } from './context/InternshipContext'
import { ToastProvider } from './context/ToastContext'
import { BookmarkProvider } from './context/BookmarkContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InternshipProvider>
        <ToastProvider>
          <BookmarkProvider>
            <App />
          </BookmarkProvider>
        </ToastProvider>
      </InternshipProvider>
    </AuthProvider>
  </StrictMode>,
)
