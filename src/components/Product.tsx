import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerActionListType } from "../context/CartProvider"

type ProductProps = {
  product:ProductType,
  dispatch:React.Dispatch<ReducerActionType>
  ReducerActionList:ReducerActionListType
  getQuantityInCart:() => string|null
}
const Product = ({product, dispatch, ReducerActionList,getQuantityInCart}:ProductProps) => {
  
// 2
const img:string = new URL(`../images/${product.name}.jpg`,import.meta.url).href
// 3
const addToCart = () => dispatch({type:ReducerActionList.ADD, payload:{...product, quantity:1}})
// このquantity:1はただpayloadの型がquantityを含むのでそのために加えたコードquantity:1は実際は使われない


  return (
    <li>
      <h3>{product.name}</h3>
      <img src={img} alt={product.name}/>
      <p>{product.price},00 USD</p>
      <button onClick={addToCart}>Add to Cart {getQuantityInCart()}</button>
    </li>
  )
}

export default Product