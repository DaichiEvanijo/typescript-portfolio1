import { useContext } from "react";
import { ProductsContext } from "../context/ProductsProvider";
import { ProductsContextType } from "../context/ProductsProvider";

const useProducts = ():ProductsContextType => {
  return useContext(ProductsContext)
}

export default useProducts