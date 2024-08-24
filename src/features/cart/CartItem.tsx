import { cartItemType } from "./CartProvider"
import { ReducerActionType } from "./CartProvider"
import { ReducerActionListType } from "./CartProvider"
import { ChangeEvent } from "react"
import formatCurrency from "../../utilities/formatCurrency"
import { Button } from "../../components/Button"


type CartItemProps = {
  item:cartItemType,
  dispatch:React.Dispatch<ReducerActionType>,
  ReducerActionList:ReducerActionListType
}
const CartItem = ({item, dispatch, ReducerActionList}:CartItemProps) => {
  const img: string = new URL(`../../assets/${item.name}.jpg`, import.meta.url).href

  const subTotalPrice :number = (item.quantity*item.price)

  const handleQtyChange = (e:ChangeEvent<HTMLInputElement>) => {
    if((e.target.value !== "" && Number(e.target.value) <= 0) || isNaN(Number(e.target.value)) ){
      alert("please enter a value or number except 0")
      return
    }
    dispatch({
    type:ReducerActionList.QUANTITY, 
    payload: {...item, quantity:Number(e.target.value)}
     })
  }

  const handleRemove = () => dispatch({type:ReducerActionList.REMOVE,payload:item})

  const handleQtyAdd = () => dispatch({type:ReducerActionList.ADD, payload:item})

  const handleQtySubtract = () => dispatch({type:ReducerActionList.SUBTRACT, payload:item})

  return (
    <li className="max-sm:w-full sm:w-1/2 md:w-1/3 mx-auto text-center p-2 *:py-3">
      <img src={img} alt={item.name} className="w-full"/>
      <div>Product: {item.name}</div>
      <div>Price: {formatCurrency(item.price)}</div>
      <div className="">
        <Button onClick={handleQtySubtract} disabled={item.quantity===0}>-</Button>
        <input value={item.quantity} onChange={handleQtyChange} className="border-y-2 rounded-sm p-1 font-bold text-black text-center  max-w-10" />
        <Button onClick={handleQtyAdd}>+</Button>
      </div>
      <div className="">Subtotal: {formatCurrency(subTotalPrice)}</div>
      <Button onClick={handleRemove}>Remove</Button>
    </li>
  )
}

export default CartItem