import React from 'react'
import ReactDOM from 'react-dom/client'

import { Vithani } from './Vithani'
import { BrowserRouter } from 'react-router-dom'

import './styles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Vithani />
    </BrowserRouter>
  </React.StrictMode>,
)
