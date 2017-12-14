/* eslint no-param-reassign: 0 */
export function state() {
  return {
    departmentNavActive: false,
    miniBasketActive: false,
    overlayActive: false,
  };
}

export const mutations = {
  toggleDepartmentNav(s, open) {
    s.departmentNavActive = open;
  },
  toggleMiniBasket(s, open) {
    s.miniBasketActive = open;
  },
  toggleOverlay(s, active) {
    s.overlayActive = active;
  },
};

export const actions = {
  openDepartmentNav({ commit }) {
    commit('toggleOverlay', true);
    commit('toggleDepartmentNav', true);
  },
  openMiniBasket({ commit }) {
    commit('toggleDepartmentNav', false);
    commit('toggleMiniBasket', true);
  },
  closeMiniBasket({ commit }) {
    commit('toggleMiniBasket', false);
  },
  activateOverlay({ commit }) {
    commit('toggleOverlay', true);
  },
  deactivateOverlay({ commit }) {
    commit('toggleOverlay', false);
    commit('toggleDepartmentNav', false);
  },
};
