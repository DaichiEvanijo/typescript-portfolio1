import useCart from "../hooks/useCart"
import { ReducerActionList } from "../context/CartProvider"
// memowiseしていないReducerActionの一覧
import { useState } from "react"
import CartItem from "./CartItem"

import { Link } from "react-router-dom"


const Cart = () => {
  
  const [confirm, setConfirm] = useState(false)
  const {dispatch, cart, totalItems, totalPrice} = useCart()

  // 後で付け加えたコード
  const handleSubmit = () => {
    const confirmed= window.confirm('Are you sure you want to place the order ?')
    if(confirmed){
      dispatch({type:ReducerActionList.SUBMIT})
      setConfirm(true)
    }
  }

  return (
    <main className="cart container">
      {confirm ? (
        <h2 className="orderConformation">Thanks for your order</h2>
      ):
        <>
          <h2 className="title">Cart</h2>
          {cart.length === 0 ? (
            <div className="ifNoproductIncart">
              <p>Your cart is empty → <Link to ="/" className="linktoHomepage">To Homepage</Link></p>  
            </div>
          ):(
            <>
              <ul>
                {cart.map(item => 
                  <CartItem 
                    key={item.id}
                    item={item}
                    dispatch={dispatch}
                    ReducerActionList={ReducerActionList}/>
                )}
              </ul>
              <div className="orderSection">
                <div className="cartTotals">
                  <p>Total Items : {totalItems}</p>
                  <p>Total Price : {totalPrice},00 USD</p>
                </div>
                <button onClick={handleSubmit} disabled={!totalItems}>Place order</button>
              </div>
            </>
            )}
        </>
      }
    </main>
  )
}

export default Cart