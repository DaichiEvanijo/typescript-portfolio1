import { ProductType } from "./ProductsProvider"
import { ReducerActionType, ReducerActionListType } from "../cart/CartProvider"
import { Link } from "react-router-dom"
import formatCurrency from "../../utilities/formatCurrency"
import { Button } from "../../components/Button"
import { memo } from "react"

type ProductProps = {
  product:ProductType,
  dispatch:React.Dispatch<ReducerActionType>
  ReducerActionList:ReducerActionListType
  getQuantityInCart:(productId:number) => string | null
}
const Product = memo(({product, dispatch, ReducerActionList,getQuantityInCart}:ProductProps) => {

const img:string = new URL(`../../assets/${product.name}.jpg`,import.meta.url).href

const addToCart = () => dispatch({type:ReducerActionList.ADD, payload:{...product, quantity:1}})
// このquantity:1はただpayloadの型がquantityを含むのでそのために加えたコードquantity:1は実際は使われない


  return (
    <li className="max-sm:w-full sm:w-1/2 md:w-1/3 text-center p-2 *:py-3">
        <h3>{product.name}</h3>
        <Link to={`/product/${product.id}`} >
          <img src={img} alt={product.name} className="w-full"/>
        </Link>
        <p>{formatCurrency(product.price)}</p>
        <Button onClick={addToCart}>Add to Cart {getQuantityInCart(product.id)}</Button>
    </li>
  )
})

export default Product