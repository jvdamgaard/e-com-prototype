/* eslint no-param-reassign: 0 */
import uniqBy from 'lodash/uniqBy';
import { uploadBasket, uploadLastSeen, createUser, getUser, updateMetadata } from '../utils/user';
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
      email: null,
      address: null,
      cf_user_id: null,
      city: null,
      full_name: null,
      phone: null,
      postal_code: null,
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
  changePersonalInformation(s, user) {
    s.personalInformation = {
      email: user.email,
      ...user.user_metadata,
    };
  },
  changeCheckoutDelivery(s, delivery) {
    s.checkout.delivery = delivery;
  },
};

export const actions = {
  async addToBasket(context, product) {
    const existing = context.state.basket.items.find(item => item.product.id === product.id);
    context.commit('addToBasket', product);
    if (!existing) {
      context.dispatch('state/openMiniBasket', null, { root: true });
    }
    await uploadBasket(context.state.basket);
  },

  async subtractInBasket(context, product) {
    context.commit('subtractInBasket', product);
    await uploadBasket(context.state.basket);
  },

  async removeFromBasket(context, product) {
    context.commit('removeFromBasket', product);
    if (context.state.basket.items.length === 0) {
      context.dispatch('state/closeMiniBasket', null, { root: true });
    }
    await uploadBasket(context.state.basket);
  },

  async addToLastSeen(ctx, product) {
    ctx.commit('addToLastSeen', product);
    await uploadLastSeen(ctx.state.lastSeen);
  },

  savePersonalInformation({ commit }, personalInformation) {
    commit('changePersonalInformation', personalInformation);
  },

  saveCheckoutDelivery({ commit }, delivery) {
    commit('changeCheckoutDelivery', delivery);
  },

  async createUser({ dispatch }, userData) {
    // Try to login user
    try {
      await dispatch('login', userData);
      await dispatch('updateUserMetadata', userData);
    } catch (e) {
      await createUser(userData);
    }
  },

  async updateUserMetadata({ commit }, userData) {
    commit('changePersonalInformation', {
      email: userData.email,
      user_metadata: {
        full_name: userData.full_name,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        postal_code: userData.postal_code,
      },
    });
    await updateMetadata(userData);
  },

  async setUserData(ctx, user) {
    // Get last seen items
    if (user.fields.lastSeen) {
      ctx.commit('setLastSeen', user.fields.lastSeen.map(Product));
    }

    // Upload current basket, if user have put items in it
    if (ctx.state.basket.length > 0) {
      await uploadBasket(ctx.state.basket);

      // Get saved basket
    } else if (user.fields.basket) {
      ctx.commit('setBasketItems', user.fields.basket.map(item => ({
        quantity: item.fields.quantity,
        product: Product(item.fields.product),
        variantSelections: item.fields.variantSelections ?
          item.fields.variantSelections.map(selection => ({
            variant: selection.fields.variantGroup.fields.header,
            item: selection.fields.variant.fields.description,
          })) :
          null,
      })));
    }
  },

  async fetchUser({ commit, dispatch }) {
    const user = window.auth.currentUser();
    if (user) {
      commit('changePersonalInformation', user);
      const cfUserData = await getUser(user.user_metadata.cf_user_id);
      dispatch('setUserData', cfUserData);
    }
  },

  async login({ dispatch }, { email, password }) {
    await window.auth.login(email, password, true);
    await dispatch('fetchUser');
  },
};
