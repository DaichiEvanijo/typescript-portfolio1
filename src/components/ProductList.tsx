// 1
import { ReactElement, useState } from "react"
import Product from "./Product"
// 5
import Pagination from "./Pagination"

// 2
import useProducts from "../hooks/useProducts"
import useCart from "../hooks/useCart"
import { ReducerActionList } from "../context/CartProvider"
// memowiseしていないReducerActionの一覧

// 3
import { ProductType } from "../context/ProductsProvider"
// filteredProductsのuseStateのtypeのため


const ProductList = () => {
  // 2
  const { dispatch, cart } = useCart()
  const { products } = useProducts()
  // 3
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products)
  const [searchText, setSearchText] = useState<string>("")
  // 5
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const lastProductIndex = currentPage*productsPerPage
  const firstProductIndex = lastProductIndex-productsPerPage
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)

  // 1
  let content: ReactElement | ReactElement[] = <p>Loading...</p>
  if(products?.length){
    content = filteredProducts.length === 0 ? (
      <div className="ifnoproduct">
        <p>There is no product that matches your filtering.</p>
        <button onClick={() => setFilteredProducts(products)}>display all products</button>
      </div>
    )
    :(
      <ul>
        {currentProducts.map((product) => {
          // 6
          const getQuantityInCart = () =>{
            const item = cart.find(item => item.id === product.id)
            return item && item.quantity > 0 ? `(${item.quantity})` : null;
          }
          return (
            <Product key={product.id} product={product} dispatch={dispatch} ReducerActionList={ReducerActionList} getQuantityInCart={getQuantityInCart} />
            // 2 Productコンポのコードの中にpropsを書いていく
          )
        })}
      </ul>
    )

  }
  
  // 3 まず検索機能から作る
  const performFiltering = () => {
    const searchfilteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(searchfilteredProducts);
    setSearchText("")
    setCurrentPage(1)
  };

  // 4 filteredボタンを作る
  const buttonFilter = (category:string) => {
    const buttonfilteredProducts = products.filter(product => product.category === category)
    setFilteredProducts(buttonfilteredProducts)
    setCurrentPage(1)
  }

  
  return (
    <main className="productlist container">
      <div className="filterbuttonandsearchbar">
        <div className="filterbutton">
          <button onClick={() => buttonFilter("Germany")}>Germany</button>
          <button onClick={() => buttonFilter("Thailand")}>Thailand</button>
          <button onClick={() => buttonFilter("Japan")}>Japan</button>
          <button onClick={() => setFilteredProducts(products)}>All</button>
        </div>
        <div className="searchbar">
          <input type="text" placeholder="input city name" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') performFiltering()}} />
        </div>
      </div>
      <div className="productmap">
        {content}
      </div>
      <div className="pagination">
        <Pagination filteredProductsLength={filteredProducts.length} productsPerPage={productsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
    </main>
  )
  // 1終わり
}

export default ProductList