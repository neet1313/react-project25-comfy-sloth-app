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
  sort: "price-lowest",
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //---------------------- Hooks----------------
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  //---------------------- Functions----------------
  const gridViewHandler = () => dispatch({ type: SET_GRIDVIEW })

  const listViewHandler = () => dispatch({ type: SET_LISTVIEW })

  const updateSortHandler = e => dispatch({ type: UPDATE_SORT, payload: e.target.value })

  const updateFilterHandler = e => {
    let name = e.target.name;
    let value = e.target.value;

    (name === "price") && (value = Number(value));
    (name === "shipping") && (value = e.target.checked);

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  }

  const clearFilterHandler = () => {
    dispatch({ type: CLEAR_FILTERS });
  }

  //---------------------- Effects----------------
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS })
  }, [state.sort, products, state.filters]);

  return (
    <FilterContext.Provider value={{ ...state, gridViewHandler, listViewHandler, updateSortHandler, updateFilterHandler, clearFilterHandler }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
