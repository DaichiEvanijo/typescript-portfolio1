type PaginationProps = {
  filteredProductsLength:number,
  productsPerPage:number
  currentPage:number,
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}
const Pagination = ({filteredProductsLength, productsPerPage, currentPage, setCurrentPage}:PaginationProps) => {

  let pages= []
  for(let i =1; i <= Math.ceil(filteredProductsLength/productsPerPage); i++){
    pages.push(i)
  }

  return (
    <div> 
      {pages.map((page, index) => {
        return(
          <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active":""}>{page}</button>
        )
      })}
    </div>
  )
}

export default Pagination