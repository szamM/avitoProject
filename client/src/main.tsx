import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FiltersProvider } from './shared/context/FiltersContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <FiltersProvider>
              <App/>
          </FiltersProvider>
      </BrowserRouter>
  </StrictMode>,
)
