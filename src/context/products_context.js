import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: []
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  //-----------------Hooks
  const [state, dispatch] = useReducer(reducer, initialState);


  //--------------Functions
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN }); //set Loading true
    try {
      const { data } = await axios(url);  //Fetch data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }


  //-----------------Effects
  useEffect(() => {
    fetchProducts(url)
  }, [])


  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
