import { useContext } from "react";
import { CartContext } from "../features/cart/CartProvider";
import { CartContextType } from "../features/cart/CartProvider";

const useCart = ():CartContextType => {
  return useContext(CartContext)
}

export default useCart