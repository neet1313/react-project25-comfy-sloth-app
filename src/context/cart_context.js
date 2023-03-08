import { createContext, useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

const initialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
  shipping_fee: 534
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //add to cart
  const addToCart = (id, color, amount, product) => dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });

  //remove item
  const removeItem = (id) => dispatch({ type: REMOVE_CART_ITEM, payload: id })

  //toggle amount
  const toggleAmount = (id, value) => { }

  //clear cart
  const clearCart = () => { }


  //----------------- Effects -------------------//

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);


  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeItem,
      toggleAmount,
      clearCart
    }}>{children}</CartContext.Provider>
  )
}

// Custom Hook
export const useCartContext = () => {
  return useContext(CartContext)
}