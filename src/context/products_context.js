import axios from 'axios'
import React, { useContext, useEffect, useReducer, useCallback } from 'react'
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
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: []
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
      console.log(error);
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  }

  const fetchSingleProduct = useCallback(async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    try {
      const { data } = await axios(url);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });

    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }, []);


  //-----------------Effects
  useEffect(() => {
    fetchProducts(url)
  }, []);


  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct, dispatch }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
