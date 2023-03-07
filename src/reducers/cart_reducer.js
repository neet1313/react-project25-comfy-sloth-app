
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
      const { id, color, amount, product } = action.payload;

      const tempIndex = state.cart.findIndex(prod => prod.id === id + color);

      if (tempIndex !== -1) {
        let product = state.cart[tempIndex];
        let newAmount = product.amount + amount;

        if (newAmount > product.max) {
          newAmount = product.max
        }
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
    default: throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer
