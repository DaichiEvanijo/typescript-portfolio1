import { Link } from "react-router-dom"
import useCart from "../hooks/useCart"
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa"
import { Button } from "../components/Button";

import Hamburger from "hamburger-react";
import { useState } from "react";

import useWindowSize from "../hooks/useWindowSize";



type HeaderProps ={
  theme:string,
  setTheme:React.Dispatch<React.SetStateAction<string>>,
}
const Header = ({theme, setTheme}:HeaderProps) => {
  const { totalItems } = useCart()
  const [isOpen, setOpen] = useState(false)
  const windowSize = useWindowSize()

  return (
    <header className="sticky top-0 bg-slate-100 dark:bg-black/80 *:dark:text-white p-4">
      <div className="max-w-5xl  mx-auto flex justify-between items-center font-bold">
        <h1><Link to="/" className="flex gap-2"><FaReact className="" fontSize=" 40px" /><BiLogoTypescript fontSize=" 40px" className="" /></Link></h1>
        {640 > windowSize && (<Button onClick={() => setTheme(prev => prev === "light"? "dark":"light")}>{theme === "light"? "dark mode":"light mode"}</Button>)}
        <nav>
          <ul className={`flex justify-between items-center gap-5 max-sm:flex-col max-sm:justify-center max-sm:fixed max-sm:top-0 max-sm:-right-[40vw] max-sm:h-screen max-sm:w-[35vw] max-sm:bg-slate-300 max-sm:transition-all max-sm:duration-700 ${isOpen ? "max-sm:right-0":""}`} onClick={() => windowSize<640 ? setOpen(prev => !prev):""}>
            <li onClick={() => windowSize<640 ? setOpen(prev => !prev):""}><Link to="/">Home</Link></li>
            <li className="relative" onClick={() => windowSize<640 ? setOpen(prev => !prev):""}>
              <Link to="/cart">
                <div className="dark:text-white">
                  <FaShoppingCart fontSize="20px"  />
                  {totalItems > 0 && <span className="absolute text-sm -top-4 -right-2.5">{totalItems}</span>}
                </div>
              </Link>
            </li>
            {windowSize >= 640 && (<li><Button onClick={() => setTheme(prev => prev === "light"? "dark":"light")}>{theme === "light"? "dark mode":"light mode"}</Button></li>)}
          </ul>
          <div className="sm:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header