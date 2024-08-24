import useCart from "../../hooks/useCart"
import { ReducerActionList } from "./CartProvider"
import { useState } from "react"
import CartItem from "./CartItem"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button"
import formatCurrency from "../../utilities/formatCurrency"


const Cart = () => {
  const {dispatch, orderedCart, totalItems, totalPrice} = useCart()
  
  const [confirm, setConfirm] = useState(false)

  const handleSubmit = () => {
    const confirmed= window.confirm('Are you sure you want to place the order ?')
    if(confirmed){
      dispatch({type:ReducerActionList.SUBMIT})
      setConfirm(true)
    }
  }

  return (
    <main className="custom-height overflow-auto *:dark:text-white bg-white dark:bg-black font-bold py-3">
      <div className="max-w-5xl mx-auto">
        {confirm ? (
          <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-center">Thanks for your order</h2>
            <Link to ="/" className=""><Button>To Homepage</Button></Link>
          </div>
        ):
          <>
            <h2 className="text-center text-3xl font-bold py-3">Cart</h2>
            {orderedCart.length === 0 ? (
              <div className="text-center">
                <p>Your cart is empty → <Link to ="/" className=""><Button>To Homepage</Button></Link></p>  
              </div>
            ):(
              <>
                <ul className="flex flex-wrap justify-between items-center ">
                  {orderedCart.map(item => 
                    <CartItem 
                      key={item.id}
                      item={item}
                      dispatch={dispatch}
                      ReducerActionList={ReducerActionList}/>
                  )}
                </ul>
                <div className="flex justify-center gap-5 items-center pt-2 border-4 border-slate-400 dark:border-slate-200  p-2 w-[50%] mx-auto">
                  <div className="font-bold text-3xl">
                    <p>Total Items : {totalItems}</p>
                    <p>{`Total Price : ${formatCurrency(Number(totalPrice))}`}</p>
                  </div>
                  <Button onClick={handleSubmit} disabled={!totalItems}>Place order</Button>
                </div>
              </>
              )}
          </>
        }
      </div>
    </main>
  )
}

export default Cart