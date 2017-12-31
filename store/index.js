/* eslint no-param-reassign: 0 */
import { getNavigation } from '../utils/navigation';

export function state() {
  return {
    navigation: {},
  };
}

export const mutations = {
  setNavigation(s, navigation) {
    s.navigation[navigation.id] = navigation;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const [
      mainNavigation,
      myAccountNavigation,
      moreMrktNavigation,
    ] = await Promise.all([
      getNavigation(process.env.CTF_MAIN_NAVIGATION_ID),
      getNavigation(process.env.CTF_MY_ACCOUNT_NAVIGATION_ID),
      getNavigation(process.env.CTF_MORE_MRKT_NAVIGATION_ID),
    ]);

    commit('setNavigation', mainNavigation);
    commit('setNavigation', myAccountNavigation);
    commit('setNavigation', moreMrktNavigation);
  },
};
