import { Outlet } from "react-router-dom";
import Header from "./Header"
import Footer from './Footer'

import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";


const Layout = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light")

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }
  }, [theme])


  return (
    <>
        <Header theme={theme} setTheme={setTheme}/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout