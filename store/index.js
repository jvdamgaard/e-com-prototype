import createPersistedState from 'vuex-persistedstate';

const browserPlugins = [];

if (process.browser) {
  browserPlugins.push(createPersistedState({ paths: ['user'] }));
}

export function state() {
  return {};
}

export const plugins = [
  ...(process.browser ? browserPlugins : []),
];
