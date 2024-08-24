import { ReactElement, useRef, useState } from "react"
import Product from "./Product"
import Pagination from "./Pagination"
import useProducts from "../../hooks/useProducts"
import useCart from "../../hooks/useCart"
import { ReducerActionList } from "../cart/CartProvider"
import { ProductType } from "./ProductsProvider"
import { Button } from "../../components/Button"

const ProductList = () => {
  const { dispatch, orderedCart } = useCart()
  const products = useProducts()
  const [searchText, setSearchText] = useState<string>("")
  // states for pagination
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)
  // the below state is only for filter button color
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["Germany", "Thailand", "Japan", "All"]

  const scrollToTopRef = useRef<HTMLDivElement>(null)
  // for the valueable, content
  let content: ReactElement | ReactElement[] = <p>Loading...</p>
  if (products?.length) {
    content = filteredProducts.length === 0 ? (
      <div className="text-center">
        <p>There is no product that matches your filtering.</p>
        <Button onClick={() => setFilteredProducts(products)}>display all products</Button>
      </div>
    ) : (
      <ul className="flex flex-wrap justify-between items-center p-3">
        {currentProducts.map((product) => {
          const getQuantityInCart = () => {
            const item = orderedCart.find(item => item.id === product.id)
            return item && item.quantity > 0 ? `(${item.quantity})` : null
          }
          return (
            <Product
              key={product.id}
              product={product}
              dispatch={dispatch}
              ReducerActionList={ReducerActionList}
              getQuantityInCart={getQuantityInCart}
            />
          )
        })}
      </ul>
    )
  }

  const performFiltering = () => {
    const searchfilteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
     (selectedCategory==="All" || product.category === selectedCategory)
    )
    setFilteredProducts(searchfilteredProducts)
    setSearchText("")
    setCurrentPage(1)
  }

  const buttonFilter = (category: string) => {
    if(category !== "All"){
      const buttonfilteredProducts = products.filter(product => 
        product.category === category &&
        product.name.toLowerCase().includes(searchText.toLowerCase())
      )
      setFilteredProducts(buttonfilteredProducts)
      setCurrentPage(1)
      setSelectedCategory(category)
    }else{
      setFilteredProducts(products)
      setCurrentPage(1)
      setSelectedCategory(category)
    }
  }

  return (
    <main className="custom-height overflow-auto *:dark:text-white bg-white dark:bg-black font-bold py-3">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-around items-center gap-3 py-3" ref={scrollToTopRef}>  
          <div className="flex justify-between gap-2 *:min-w-[5rem]">
          {categories.map((category) => 
            <Button key={category} onClick={()=> buttonFilter(category)} className={`${selectedCategory === category ? 'bg-slate-500 text-white dark:bg-slate-500' :""}`}>{category}</Button>)}
          </div>
          <div>
            <input
              type="text"
              placeholder="input city name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') performFiltering() }}
              className="bg-slate-200 text-black rounded-sm p-2 font-bold"
            />
          </div>
        </div>
        <div>
          {content}
        </div>
        <div>
          <Pagination filteredProductsLength={filteredProducts.length} productsPerPage={productsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToTopRef={scrollToTopRef} />
        </div>
      </div>
    </main>
  )
}

export default ProductList
