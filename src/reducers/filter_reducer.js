import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, filtered_Products: [...action.payload], all_products: [...action.payload] }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }
    case SORT_PRODUCTS:
      const { sort, filtered_Products } = state

      let tempArr = [...filtered_Products]

      if (sort === "price-lowest") {
        tempArr.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempArr.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempArr.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === "name-z") {
        tempArr.sort((a, b) => b.name.localeCompare(a.name));
      }

      return { ...state, filtered_Products: tempArr }

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
