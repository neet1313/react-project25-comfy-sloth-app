
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let { id, color, amount, product } = action.payload;

      const tempIndex = state.cart.findIndex(prod => prod.id === id + color);

      if (tempIndex !== -1) {
        let product = state.cart[tempIndex];
        let newAmount = product.amount + amount;

        (newAmount > product.max) && (newAmount = product.max);
        product.amount = newAmount;

        return { ...state }

      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock
        }

        return { ...state, cart: [...state.cart, newItem] }
      }

    case REMOVE_CART_ITEM:
      let filteredArray = state.cart.filter(item => item.id !== action.payload);
      return { ...state, cart: filteredArray }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case TOGGLE_CART_ITEM_AMOUNT:
      const { value } = action.payload;

      let tempArr = state.cart.map(item => {
        if (item.id === action.payload.id) {
          if (value === 'increase') {
            let newAmt = item.amount + 1;
            (newAmt > item.max) && (newAmt = item.max);
            return { ...item, amount: newAmt }
          }
          if (value === 'decrease') {
            let newAmt = item.amount - 1;
            (newAmt < 1) && (newAmt = 1);
            return { ...item, amount: newAmt }
          }
        } else {
          return item;
        }
        return { ...state }
      });

      return { ...state, cart: tempArr }

    case COUNT_CART_TOTALS:
      const { total_amount, total_items } = state.cart.reduce((total, cartItem) => {
        total.total_items += cartItem.amount;
        total.total_amount += cartItem.amount * cartItem.price;
        return total;
      }, { total_amount: 0, total_items: 0 })
      return { ...state, total_amount, total_items }

    default: throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer
