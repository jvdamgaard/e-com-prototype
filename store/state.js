/* eslint no-param-reassign: 0 */
export function state() {
  return {
    deparmentNavActive: false,
  };
}

export const mutations = {
  toggleDepartmentNav(s, open) {
    s.deparmentNavActive = open;
  },
};

export const actions = {
  openDepartmentNav({ commit }) {
    commit('toggleDepartmentNav', true);
  },
  closeDepartmentNav({ commit }) {
    commit('toggleDepartmentNav', false);
  },
};
