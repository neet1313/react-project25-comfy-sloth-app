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
      let maxPrice = 0;
      action.payload.map(product => {
        (product.price > maxPrice) && (maxPrice = product.price)
        return maxPrice
      })

      return {
        ...state,
        filtered_Products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
      }

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

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text,
        company,
        category,
        color,
        price,
        max_price,
        shipping
      } = state.filters;
      let tempProducts = [...all_products];

      //Filtering

      //text
      (text) && (tempProducts = tempProducts.filter(product => product.name.toLowerCase().startsWith(text.toLowerCase())));
      //category
      (category !== 'all') && (tempProducts = tempProducts.filter(product => product.category === category));
      //company
      (company !== 'all') && (tempProducts = tempProducts.filter(product => product.company === company));
      //color
      (color[0] === '#') && (tempProducts = tempProducts.filter(product => product.colors.includes(color)));
      //price
      (price < max_price) && (tempProducts = tempProducts.filter(product => product.price <= price));
      //shipping
      (shipping) && (tempProducts = tempProducts.filter(product => product.shipping))

      return { ...state, filtered_Products: tempProducts }

    case CLEAR_FILTERS:
      return {
        ...state, filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false
        }
      }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
