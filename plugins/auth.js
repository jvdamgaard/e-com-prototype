import GoTrue from 'gotrue-js';

export default () => {
  window.auth = new GoTrue({ setCookie: true });
};
