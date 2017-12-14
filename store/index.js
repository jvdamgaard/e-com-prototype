/* eslint no-param-reassign: 0 */
import { getNavigation } from '../utils/navigation';

export function state() {
  return {
    departments: [],
  };
}

export const mutations = {
  setDepartments(s, departments) {
    s.departments = departments;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const departments = await getNavigation();
    commit('setDepartments', departments);
  },
};
