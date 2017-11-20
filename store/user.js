/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';
import sha256 from 'hash.js/lib/hash/sha/256';
import * as contentful from '../plugins/contentful';
import { uploadBasket, uploadLastSeen, createUser, updateUser, getUser } from '../utils/user';
import { Product } from '../utils/product';

export function state() {
  return {
    lastSeen: [],
    basket: {
      items: [],
    },
    checkout: {
      delivery: {
        method: null,
        address: null,
      },
      payment: {
        method: null,
        address: null,
      },
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
  setBasketItems(s, items) {
    s.basket.items = items;
  },
  addToLastSeen(s, product) {
    s.lastSeen = uniqBy([
      product,
      ...s.lastSeen,
    ], 'id').slice(0, 100);
  },
  setLastSeen(s, products) {
    s.lastSeen = products;
  },
  changePersonalInformation(s, personalInformation) {
    const {
      name,
      email,
      address,
      phone,
    } = personalInformation;
    s.personalInformation = {
      name,
      email,
      address,
      phone,
    };
  },
  changeCheckoutDelivery(s, delivery) {
    s.checkout.delivery = delivery;
  },
};

export const actions = {
  addToBasket(context, product) {
    const existing = context.state.basket.items.find(item => item.product.id === product.id);
    context.commit('addToBasket', product);
    if (!existing) {
      context.dispatch('state/openMiniBasket', null, { root: true });
    }
    uploadBasket(context.state.basket);
  },
  subtractInBasket(context, product) {
    context.commit('subtractInBasket', product);
    uploadBasket(context.state.basket);
  },
  removeFromBasket(context, product) {
    context.commit('removeFromBasket', product);
    if (context.state.basket.items.length === 0) {
      context.dispatch('state/closeMiniBasket', null, { root: true });
    }
    uploadBasket(context.state.basket);
  },
  addToLastSeen(ctx, product) {
    ctx.commit('addToLastSeen', product);
    uploadLastSeen(ctx.state.lastSeen);
  },
  savePersonalInformation({ commit }, personalInformation) {
    commit('changePersonalInformation', personalInformation);
  },
  saveCheckoutDelivery({ commit }, delivery) {
    commit('changeCheckoutDelivery', delivery);
  },
  createUser({ commit, dispatch }, userData) {
    // Try to login user
    return dispatch('login', userData)
      .then(() => dispatch('updateUser', userData))

      // If user doesn't exist try to create a new one
      .catch(() => createUser(userData)
        .then((entry) => {
          window.localStorage.setItem('userId', entry.sys.id);
          commit('changePersonalInformation', userData);
        }));
  },
  updateUser({ commit }, userData) {
    commit('changePersonalInformation', userData);
    return updateUser(userData);
  },
  setUserData(ctx, user) {
    // Set personal data
    ctx.commit('changePersonalInformation', { ...user.fields });

    // Upload current basket, if user have put items in it
    if (ctx.state.basket.length > 0) {
      uploadBasket(ctx.state.basket);

      // Get saved basket
    } else if (user.fields.basket) {
      ctx.commit('setBasketItems', user.fields.basket.map(item => ({
        quantity: item.fields.quantity,
        product: Product(item.fields.product),
      })));
    }

    // Get last seen items
    ctx.commit('setLastSeen', user.fields.lastSeen.map(Product));
  },
  fetchUser({ dispatch }) {
    return getUser().then(user => dispatch('setUserData', user));
  },
  login({ dispatch }, { email, password }) {
    return contentful.deliveryClient
      .getEntries({
        content_type: 'user',
        'fields.email': email,
        'fields.password': sha256().update(password).digest('hex'),
      })
      .then((res) => {
        window.localStorage.setItem('userId', res.items[0].sys.id);
        dispatch('setUserData', res.items[0]);
      });
  },
};
