import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Homepage } from './pages/Homepage/index.jsx'
import { GlobalStyle } from './styles/global.js'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <ToastContainer position='top-center' toastStyle={{ width: "35rem", fontSize: "1rem", padding: "1.5rem", fontFamily: "Poppins"}}/>
    <Homepage />
  </StrictMode>,
)
