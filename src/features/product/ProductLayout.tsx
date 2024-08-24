import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import useProducts from "../../hooks/useProducts"
import { ProductType } from "./ProductsProvider"

const ProductLayout = () => {
  const products  = useProducts()
  const {id} = useParams()
  const product = products.find(product => product.id === Number(id))

  if(product===null) return <Navigate to="/" replace />

  return <Outlet context={product}/>
}
export default ProductLayout

export const useSingleProduct = () => useOutletContext<ProductType>()
