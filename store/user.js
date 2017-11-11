/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';
import sha256 from 'hash.js/lib/hash/sha/256';
import * as contentful from '../plugins/contentful';

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
  addToLastSeen(s, product) {
    s.lastSeen = uniqBy([
      product,
      ...s.lastSeen,
    ], 'id').slice(0, 100);
  },
  changePersonalInformation(s, personalInformation) {
    s.personalInformation = personalInformation;
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
  saveCheckoutDelivery({ commit }, delivery) {
    commit('changeCheckoutDelivery', delivery);
  },
  createUser({ commit, dispatch }, userData) {
    // Try to login user
    return dispatch('login', userData)
      .then(() => dispatch('updateUser', userData))

      // If user doesn't exist try to create a new one
      .catch(() => contentful.managementClient.getSpace(process.env.CTF_SPACE_ID))
      .then(space => space.createEntry('user', {
        fields: {
          name: { 'da-DK': userData.name },
          email: { 'da-DK': userData.email },
          address: { 'da-DK': userData.address },
          phone: { 'da-DK': userData.phone },
          password: { 'da-DK': sha256().update(userData.password).digest('hex') },
        },
      }))
      .then(entry => entry.publish())
      .then((entry) => {
        window.localStorage.setItem('userId', entry.sys.id);
        commit('changePersonalInformation', {
          name: entry.fields.name['da-DK'],
          email: entry.fields.email['da-DK'],
          address: entry.fields.address['da-DK'],
          phone: entry.fields.phone['da-DK'],
        });
      });
  },
  updateUser({ commit }, userData) {
    commit('changePersonalInformation', userData);
    return contentful.managementClient
      .getSpace(process.env.CTF_SPACE_ID)
      .then(space => space.getEntry(window.localStorage.getItem('userId')))
      .then((entry) => {
        entry.fields.name['da-DK'] = userData.name;
        entry.fields.email['da-DK'] = userData.email;
        entry.fields.address['da-DK'] = userData.address;
        entry.fields.phone['da-DK'] = userData.phone;
        return entry.update();
      })
      .then(entry => entry.publish());
  },
  fetchUser({ commit }, userId) {
    return contentful.deliveryClient
      .getEntry(userId)
      .then((entry) => {
        commit('changePersonalInformation', { ...entry.fields });
      });
  },
  login({ commit }, { email, password }) {
    return contentful.deliveryClient
      .getEntries({
        content_type: 'user',
        'fields.email': email,
        'fields.password': sha256().update(password).digest('hex'),
      })
      .then((res) => {
        window.localStorage.setItem('userId', res.items[0].sys.id);
        commit('changePersonalInformation', { ...res.items[0].fields });
      });
  },
};
