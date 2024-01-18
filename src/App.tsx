import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ProductList/>}/>
        <Route path="cart">
          <Route index element={<Cart/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
