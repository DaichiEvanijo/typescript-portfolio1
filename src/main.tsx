import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/index.scss'

import {CartProvider} from './context/CartProvider.tsx'
import { ProductsContextProvider } from './context/ProductsProvider.tsx'

import { HashRouter as Router, Routes, Route  } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/*" element= {<App />}/>
          </Routes>
        </Router>
      </CartProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
)
