/* eslint no-param-reassign: 0 */
export function state() {
  return {
    departmentNavActive: false,
    miniBasketActive: false,
    overlayActive: false,
    overlayHoverClose: true,
    mobileNavActive: false,
  };
}

export const mutations = {
  toggleDepartmentNav(s, open) {
    s.departmentNavActive = open;
  },
  toggleMiniBasket(s, open) {
    s.miniBasketActive = open;
  },
  toggleOverlay(s, { active, hoverClose = true }) {
    s.overlayActive = active;
    s.overlayHoverClose = hoverClose;
  },
  toggleMobileNav(s, active) {
    s.mobileNavActive = active;
  },
};

export const actions = {
  openDepartmentNav({ commit }) {
    commit('toggleOverlay', { active: true });
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
    commit('toggleOverlay', { active: true });
  },
  deactivateOverlay({ commit }) {
    commit('toggleOverlay', { active: false });
    commit('toggleDepartmentNav', false);
    commit('toggleMobileNav', false);
  },
  openMobileNav({ commit }) {
    commit('toggleMobileNav', true);
    commit('toggleOverlay', { active: true, hoverClose: false });
  },
};
