import { ReactElement, createContext, useReducer } from "react";

export type cartItemType = {
  id:number,
  category:string,
  name:string,
  price:number,
  quantity: number 
}

const initialCartState : cartItemType[] = []

export const ReducerActionList = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBTRACT:"SUBTRACT",
  SUBMIT: "SUBMIT"
}
export type ReducerActionListType = typeof ReducerActionList

export type ReducerActionType = {
  type:string,
  payload?: cartItemType
}
const reducer = (cart: cartItemType[], action:ReducerActionType): cartItemType[] => {
  switch (action.type){
  
    case ReducerActionList.ADD: {
      if(!action.payload) {
        throw new Error ('action payload is missing in ADD action')
      }
      const {id, category, name, price} = action.payload
      const filteredCart :cartItemType[] = cart.filter(item => item.id !== id);
      const itemExists : cartItemType | undefined = cart.find(item => item.id === id);
      const updatedQty : number = itemExists? itemExists.quantity + 1 : 1;
      return [...filteredCart, {id, category, name, price, quantity:updatedQty}]
    }

    case ReducerActionList.REMOVE:{
      if(!action.payload) {
        throw new Error ('action payload is missing in REMOVE action')
      }
      const {id} = action.payload
      const filteredCart :cartItemType[] = cart.filter(item => item.id !== id);
      return [...filteredCart]
    }

    case ReducerActionList.QUANTITY:{
      if (!action.payload) {
        throw new Error ('action.payload is missing in QUANTITY action')
      }
      const {id, category, name, price, quantity} = action.payload
      const filteredCart : cartItemType[] = cart.filter(item => item.id !== id)
      return [...filteredCart, {id, category, name, price, quantity}]
    }

    case ReducerActionList.SUBTRACT: {
      if(!action.payload) {
        throw new Error ('action payload is missing in SUNBTRACT action')
      }
      const {id, category, name, price} = action.payload
      const filteredCart :cartItemType[] = cart.filter(item => item.id !== id);
      const itemExists : cartItemType | undefined = cart.find(item => item.id === id);
      if(!itemExists){
        throw new Error('item must exist in order to update quantity')
      }
      const updatedQty : number =  itemExists.quantity >1 ? itemExists.quantity-1:1
      return [...filteredCart, {id, category, name, price, quantity:updatedQty}]
    }

    case ReducerActionList.SUBMIT: {
      return []
    }

    default:
      throw new Error('unidentified reducer action type')
  }
}



export type CartContextType = {
  dispatch:React.Dispatch<ReducerActionType>,
  orderedCart:cartItemType[],
  totalItems:number,
  totalPrice: string
}
const initCartContextState : CartContextType = {
  dispatch:() => {},
  orderedCart:[],
  totalItems:0,
  totalPrice: ''
}
export const CartContext = createContext<CartContextType>(initCartContextState)

 type CartContextProviderProps = {children?: ReactElement | ReactElement[]}

export const CartProvider = ({children}: CartContextProviderProps) :ReactElement => {
  
  const [cart, dispatch] = useReducer(reducer, initialCartState)

  const orderedCart = cart.sort((a,b) => {
    const itemA = Number(a.id)
    const itemB = Number(b.id)
    return itemA-itemB
  })
  
  const totalItems = cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity
  },0)
  
  const totalPrice = (cart.reduce((previousValue, cartItem) => previousValue+cartItem.quantity*cartItem.price,0)).toString()


  
  return (
    <CartContext.Provider value={{dispatch, orderedCart, totalItems, totalPrice}}>
      {children}
    </CartContext.Provider>
  )
}