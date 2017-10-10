/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';
import lastSeen from '../static/json/last-seen.json';

export function state() {
  return {
    lastSeen: lastSeen.slice(0, 5),
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
      s.basket.items = [
        { quantity: 1, product },
        ...s.basket.items,
      ];
    }
  },
  subtractInBasket(s, product) {
    const existing = s.basket.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity === 0) {
        s.basket.items = s.basket.items.filter(item => item.product.id !== product.id);
      }
    }
  },
  removeFromBasket(s, product) {
    s.basket.items = s.basket.items.filter(item => item.product.id !== product.id);
  },
  addToLastSeen(s, product) {
    s.lastSeen = uniqBy([
      product,
      ...s.lastSeen,
    ], 'id').slice(0, 100);
  },
};

export const actions = {
  addToBasket(context, product) {
    const existing = context.state.basket.items.find(item => item.product.id === product.id);
    context.commit('addToBasket', product);
    if (!existing) {
      context.dispatch('state/openMiniBasket', null, { root: true });
    }
  },
  subtractInBasket(context, product) {
    context.commit('subtractInBasket', product);
    if (context.state.user.basket.items.length === 0) {
      context.dispatch('state/closeMiniBasket', null, { root: true });
    }
  },
  removeFromBasket(context, product) {
    context.commit('removeFromBasket', product);
    if (context.state.basket.items.length === 0) {
      context.dispatch('state/closeMiniBasket', null, { root: true });
    }
  },
  addToLastSeen({ commit }, product) {
    commit('addToLastSeen', product);
  },
};
