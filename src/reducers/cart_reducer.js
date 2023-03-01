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

      const tempProduct = state.cart.find(prod => prod.id === (prod.id + color));

      if (tempProduct) {
        const tempCart = state.cart.map(item => {
          if (item.id === (id + color)) {
            let newAmount = amount + item.amount;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...state, amount: newAmount }
          } else {
            return item;
          }
        });

        return { ...state, cart: tempCart }
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
