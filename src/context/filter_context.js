import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_Products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest"
}

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //---------------------- Hooks----------------
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  //---------------------- Functions----------------
  const gridViewHandler = () => { dispatch({ type: SET_GRIDVIEW }) }
  const listViewHandler = () => { dispatch({ type: SET_LISTVIEW }) }

  //---------------------- Effects----------------
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, gridViewHandler, listViewHandler }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
