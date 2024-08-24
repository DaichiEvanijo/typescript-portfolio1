import { useContext } from "react";
import { ProductsContext } from "../features/product/ProductsProvider";
import { ProductType } from "../features/product/ProductsProvider";

const useProducts = (): ProductType[] => {
  return useContext(ProductsContext);
};

export default useProducts;