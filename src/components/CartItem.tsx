import { ChangeEvent } from "react"
import { cartItemType } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { ReducerActionListType } from "../context/CartProvider"


type CartItemProps = {
  item:cartItemType,
  dispatch:React.Dispatch<ReducerActionType>,
  ReducerActionList:ReducerActionListType
}
const CartItem = ({item, dispatch, ReducerActionList}:CartItemProps) => {


  const img: string = new URL(`../images/${item.name}.jpg`, import.meta.url).href

  const subTotalPrice :number = (item.quantity*item.price)

  const handleQtyChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(isNaN(Number(e.target.value))){
      alert("please enter a value")
      return
    }
    dispatch({
    type:ReducerActionList.QUANTITY, 
    payload: {...item, quantity:Number(e.target.value)}
     })
  }

  const handleRemove = () => dispatch({type:ReducerActionList.REMOVE,payload:item})

  const handleQtyAdd = () => dispatch({type:ReducerActionList.ADD, payload:item})

  const handleQtySubtract = () => dispatch
  ({type:ReducerActionList.SUBTRACT, payload:item})



  return (
    <li>
      <img src={img} alt={item.name} />
      <div>Product: {item.name}</div>
      <div>Price: {item.price},00 USD</div>
      <div className="itemquantity">
        <button onClick={handleQtyAdd}>+</button>
        <input value={item.quantity} onChange={handleQtyChange} />
        <button onClick={handleQtySubtract} disabled={item.quantity===0}>-</button>
      </div>
      <div className="subtotalperitem">Subtotal: {subTotalPrice},00 USD</div>
      <button onClick={handleRemove}>Remove</button>
    </li>
  )
}

export default CartItem