/* eslint no-param-reassign: 0 */
export function state() {
  return {
    departmentNavActive: false,
    miniBasketActive: false,
  };
}

export const mutations = {
  toggleDepartmentNav(s, open) {
    s.departmentNavActive = open;
  },
  toggleMiniBasket(s, open) {
    s.miniBasketActive = open;
  },
};

export const actions = {
  openDepartmentNav({ commit }) {
    commit('toggleMiniBasket', false);
    commit('toggleDepartmentNav', true);
  },
  closeDepartmentNav({ commit }) {
    commit('toggleDepartmentNav', false);
  },
  openMiniBasket({ commit }) {
    commit('toggleDepartmentNav', false);
    commit('toggleMiniBasket', true);
  },
  closeMiniBasket({ commit }) {
    commit('toggleMiniBasket', false);
  },
};
