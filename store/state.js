/* eslint no-param-reassign: 0 */
export function state() {
  return {
    departmentNavActive: false,
  };
}

export const mutations = {
  toggleDepartmentNav(s, open) {
    s.departmentNavActive = open;
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
