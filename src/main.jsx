import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeContextProvider } from './stores/ThemeContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
        <App />
    </ThemeContextProvider>
)