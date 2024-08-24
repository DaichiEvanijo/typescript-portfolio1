import { Link } from 'react-router-dom'
import { useSingleProduct } from './ProductLayout'
import { ReducerActionList } from '../cart/CartProvider'
import useCart from '../../hooks/useCart'
import { Button } from '../../components/Button'

const SingleProduct = () => {
  const product = useSingleProduct()
  const img:string = new URL(`../../assets/${product.name}.jpg`,import.meta.url).href
  const { dispatch, orderedCart } = useCart()
  const addToCart = () => dispatch({type:ReducerActionList.ADD, payload:{...product, quantity:1}})
  const getQuantityInCart = () =>{
    const item = orderedCart.find(item => item.id === product.id)
    return item && item.quantity > 0 ? `(${item.quantity})` : null;
  }

  return (
    <main className="custom-height flex flex-col justify-center items-center gap-3 *:dark:text-white  bg-white dark:bg-black font-bold">
      <div className=" max-w-5xl mx-auto"></div>
      <div>{product.name}</div>
      <img src={img} alt={product.name}/>
      <div className='flex gap-3'>
      <Button onClick={addToCart}>Add to Cart {getQuantityInCart()}</Button>
      <Button><Link to="/">back to product list</Link></Button>
      </div>
    </main>
  )
}

export default SingleProduct