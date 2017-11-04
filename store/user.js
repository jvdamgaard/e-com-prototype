/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';

export function state() {
  return {
    lastSeen: [],
    basket: {
      items: [],
    },
    personalInformation: {
      name: null,
      email: null,
      address: null,
      phone: null,
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
  changePersonalInformation(s, personalInformation) {
    s.personalInformation = personalInformation;
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
  savePersonalInformation({ commit }, personalInformation) {
    commit('changePersonalInformation', personalInformation);
  },
};
