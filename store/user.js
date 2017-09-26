/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';
import products from '../mock/products';

export function state() {
  return {
    lastSeen: products,
    basket: {
      items: [],
    },
  };
}

export const mutations = {
  addToBasket(s, product) {
    const existing = s.basket.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      s.basket.items.push({
        quantity: 1,
        product,
      });
    }
  },
  subtractInBasket(s, product) {
    const existing = s.basket.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity === 0) {
        s.basket.items = s.basket.items.filter(item => item.product !== product.id);
      }
    }
  },
  addToLastSeen(s, product) {
    s.lastSeen = uniqBy([
      product,
      ...s.lastSeen,
    ], 'id').slice(0, 100);
  },
};

export const actions = {
  addToBasket({ commit }, product) {
    commit('addToBasket', product);
  },
  subtractInBasket({ commit }, product) {
    commit('subtractInBasket', product);
  },
  addToLastSeen({ commit }, product) {
    commit('addToLastSeen', product);
  },
};
