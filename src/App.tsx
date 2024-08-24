import {Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import ProductList from './features/product/ProductList'
import Cart from './features/cart/Cart'
import ProductLayout from './features/product/ProductLayout'
import SingleProduct from './features/product/SingleProduct'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<ProductList />}/>

        <Route path="product/:id" element={<ProductLayout/>}>
          <Route index element={<SingleProduct/>}/>
          {/* if needed, <EditProduct> component can be included here */}
        </Route>

        <Route path="cart">
          <Route index element={<Cart/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
