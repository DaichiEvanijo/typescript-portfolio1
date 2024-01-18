import { useContext } from "react";
import { ProductsContext } from "../context/ProductsProvider";
import { ProductType } from "../context/ProductsProvider";

const useProducts = (): {products:ProductType[]} => {
  const products = useContext(ProductsContext);
  return { products };
}


export default useProducts