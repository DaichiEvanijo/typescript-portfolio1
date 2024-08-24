import { useEffect } from "react"

type PaginationProps = {
  filteredProductsLength:number,
  productsPerPage:number
  currentPage:number,
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>
  scrollToTopRef:React.RefObject<HTMLDivElement>
}
const Pagination = ({filteredProductsLength, productsPerPage, currentPage, setCurrentPage, scrollToTopRef}:PaginationProps) => {

  let pages= []
  for(let i =1; i <= Math.ceil(filteredProductsLength/productsPerPage); i++){
    pages.push(i)
  }

  useEffect(() => {
      if(scrollToTopRef.current){
        scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [currentPage]); 

  
  return (
    <div className="flex justify-center items-center gap-5 *:border-2 *:p-2 *:rounded-md "> 
      {pages.map((page, index) => {
        return(
          <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? "bg-slate-400":""} >{page}</button>
        )
      })}
    </div>
  )
}

export default Pagination