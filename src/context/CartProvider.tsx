// https://chat.openai.com/share/6b5de2ae-182b-4bfa-bd15-2dbfcb723785

import { ReactElement, createContext, useReducer } from "react";

// 8
export type cartItemType = {
  id:number,
  category:string,
  name:string,
  price:number,
  quantity: number 
}
// 7
type CartStateType = {cart:cartItemType[]}
// 6 まずcartのcontextのためのコードを考える
const initialCartState : CartStateType = {cart: []}

// 11
export const ReducerActionList = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBTRACT:"SUBTRACT",
  SUBMIT: "SUBMIT"
}
export type ReducerActionListType = typeof ReducerActionList

// 10
export type ReducerActionType = {
  type:string,
  payload?: cartItemType
}
// 9 次にuseReducerのためのコードを書く(cartのcontextのための)
const reducer = (state: CartStateType, action:ReducerActionType): CartStateType => {
  switch (action.type){
    // 10
    case ReducerActionList.ADD: {
      if(!action.payload) {
        throw new Error ('action payload is missing in ADD action')
      }
      const {id, category, name, price} = action.payload
      const filteredCart :cartItemType[] = state.cart.filter(item => item.id !== id);
      const itemExists : cartItemType | undefined = state.cart.find(item => item.id === id);
      const updatedQty : number = itemExists? itemExists.quantity + 1 : 1;
      return {...state, cart: [...filteredCart, {id, category, name, price, quantity:updatedQty}]}
    }

    case ReducerActionList.REMOVE:{
      if(!action.payload) {
        throw new Error ('action payload is missing in REMOVE action')
      }
      const {id} = action.payload
      const filteredCart :cartItemType[] = state.cart.filter(item => item.id !== id);
      return {...state, cart: [...filteredCart]}
    }

    case ReducerActionList.QUANTITY:{
      if (!action.payload) {
        throw new Error ('action.payload is missing in QUANTITY action')
      }
      const {id, category, name, price, quantity} = action.payload
      const filteredCart : cartItemType[] = state.cart.filter(item => item.id !== id)
      const itemExists : cartItemType | undefined = state.cart.find(item => item.id === id)
      if(!itemExists){
        throw new Error('item must exist in order to update quantity')
      }
      return {...state, cart:[...filteredCart, {id, category, name, price, quantity}]}
      // このコードはオリジナルと少し違うのでもしエラー出たらチェックあるいはオリジナルのコードに変更
    }

    case ReducerActionList.SUBTRACT: {
      if(!action.payload) {
        throw new Error ('action payload is missing in SUNBTRACT action')
      }
      const {id, category, name, price} = action.payload
      const filteredCart :cartItemType[] = state.cart.filter(item => item.id !== id);
      const itemExists : cartItemType | undefined = state.cart.find(item => item.id === id);
      if(!itemExists){
        throw new Error('item must exist in order to update quantity')
      }
      const updatedQty : number =  itemExists.quantity >1 ? itemExists.quantity-1:1
      return {...state, cart: [...filteredCart, {id, category, name, price, quantity:updatedQty}]} 
    }

    case ReducerActionList.SUBMIT: {
      return {...state, cart:[]}
    }

    default:
      throw new Error('unidentified reducer action type')
  }
}


// 2
export type CartContextType = {
  // 15
  dispatch:React.Dispatch<ReducerActionType>,
  cart:cartItemType[],
  totalItems:number,
  totalPrice: string
}
// 3
const initCartContextState : CartContextType = {
  // 16
  dispatch:() => {},
  cart:[],
  totalItems:0,
  totalPrice: ''
}
// 1
export const CartContext = createContext<CartContextType>(initCartContextState)

// 5
 type CartContextProviderProps = {children?: ReactElement | ReactElement[]}
// 4
export const CartProvider = ({children}: CartContextProviderProps) :ReactElement => {
  // 11
  const [state, dispatch] = useReducer(reducer, initialCartState)
  // 12
  const cart = state.cart.sort((a,b) => {
    const itemA = Number(a.id)
    const itemB = Number(b.id)
    return itemA-itemB
  })
  // 13
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity
  },0)
  // 14 
  const totalPrice = (state.cart.reduce((previousValue, cartItem) => previousValue+cartItem.quantity*cartItem.price,0)).toString()

  return (
    <CartContext.Provider value={{dispatch, cart, totalItems, totalPrice}}>
      {children}
    </CartContext.Provider>
  )
}