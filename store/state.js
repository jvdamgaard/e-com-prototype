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
    commit('toggleDepartmentNav', true);
  },
  closeDepartmentNav({ commit }) {
    commit('toggleDepartmentNav', false);
  },
  openMiniBasket({ commit }) {
    commit('toggleMiniBasket', true);
  },
  closeMiniBasket({ commit }) {
    commit('toggleMiniBasket', false);
  },
};
