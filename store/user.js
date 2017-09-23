/* eslint no-param-reassign: 0 */

import products from '../mock/products';

export function state() {
  return {
    lastSeen: products,
    basket: {
      items: products.slice(0, 3).map(product => ({
        quantity: Math.ceil(Math.random() * 3),
        product,
      })),
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
};

export const actions = {
  addToBasket({ commit }, product) {
    commit('addToBasket', product);
  },
  subtractInBasket({ commit }, product) {
    commit('subtractInBasket', product);
  },
};
