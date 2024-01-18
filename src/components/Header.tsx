import { Link } from "react-router-dom"

import useCart from "../hooks/useCart"

import { FaReact } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa"

const Header = () => {
  
  const { totalItems } = useCart()

  return (
    <header className="container">
      <h1><Link to="/"><FaReact className="icon" fontSize=" 40px" /><BiLogoTypescript fontSize=" 40px" className="icon" /></Link></h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="cartlogo">
            <Link to="/cart">
              <div>
                <FaShoppingCart color="black" fontSize="20px" />
                {totalItems > 0 && <span>{totalItems}</span>}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header