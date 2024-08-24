import { useEffect, useState } from "react"

const useLocalStorage = <T>(key:string, initialValue:T | (() => T)) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if(jsonValue === null){
      if(typeof initialValue === "function"){
        return (initialValue as () =>T)() 
        // initialValueはT or () => Tの可能性があるのでasでassetion
      }else{
        return initialValue
      }
    }else{
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  },[key, value])

  return [value, setValue] as [T, typeof setValue]
  // asha nicht unbedingt
}

export default useLocalStorage