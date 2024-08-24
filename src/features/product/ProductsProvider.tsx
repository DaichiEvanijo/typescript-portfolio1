import { ReactElement, createContext, useState } from "react";
import React from "react";

export type ProductType = {
  id: number;
  category: string;
  name: string;
  price: number;
};

export const initState : ProductType[] = [
  {
    "id":1,
    "category": "Thailand",
    "name":"Bangkok1", 
    "price":25
  },
  {
    "id":2,
    "category": "Thailand",
    "name":"Bangkok2",
    "price":25
  },
  {
    "id":3,
    "category": "Thailand",
    "name":"Chiangmai1",
    "price":25
  },
  {
    "id":4,
    "category": "Thailand",
    "name":"Chiangmai2",
    "price":25
  },
  {
    "id":5,
    "category": "Germany",
    "name":"Berlin1",
    "price":25
  },
  {
    "id":6,
    "category": "Germany",
    "name":"Berlin2",
    "price":25
  },
  {
    "id":7,
    "category": "Germany",
    "name":"Bochum1",
    "price":25
  },
  {
    "id":8,
    "category": "Germany",
    "name":"Bochum2",
    "price":25
  },
  {
    "id":9,
    "category": "Japan",
    "name":"Fukuoka1",
    "price":25
  },
  {
    "id":10,
    "category": "Japan",
    "name":"Fukuoka2",
    "price":25
  },
  {
    "id":11,
    "category": "Japan",
    "name":"Nagasaki1",
    "price":25
  },
  {
    "id":12,
    "category": "Japan",
    "name":"Nagasaki2",
    "price":25
  }
]

export const ProductsContext = createContext<ProductType[]>(initState);

type ProductsContextProviderProps = {
  children: React.ReactNode
};

export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps): ReactElement => {
  const [products, _setProducts] = useState<ProductType[]>(initState);

  // alternatively
  //   useEffect(() => {
  //    const fetchProducts = async (): Promise<ProductType[]> => {
  //     try {
  //       const response = await fetch('http://localhost:3500/products')
  //       const data = await response.json()
  //       setProducts(data)
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.log(err.message)
  //       }
  //     }
  //   }
  //   fetchProducts()
  // }, [])

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};