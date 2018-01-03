/* eslint no-param-reassign: 0 */
import axios from 'axios';
import contentful from './contentful';

export function getUser(id) {
  return contentful.client
    .getEntries({ 'sys.id': id, include: 3 })
    .then(entries => entries.items[0]);
}

export function uploadBasket(basket) {
  const user = window.auth.currentUser();
  if (!user) { return; }
  axios.put(`/.netlify/functions/update-basket?cf_user_id=${user.user_metadata.cf_user_id}`, basket);
}

export function uploadLastSeen(lastSeen) {
  const user = window.auth.currentUser();
  if (!user) { return; }
  axios.put(`/.netlify/functions/update-lastseen?cf_user_id=${user.user_metadata.cf_user_id}`, lastSeen);
}

export async function createUser({
  email,
  password,
  address,
  postal_code, // eslint-disable-line
  city,
  full_name, // eslint-disable-line
  phone,
}) {
  const cfUserResponse = await axios.get('/.netlify/functions/create-user/');
  const userMetadata = {
    address,
    postal_code,
    city,
    full_name,
    phone,
    cf_user_id: cfUserResponse.data.id,
  };
  await window.auth.signup(email, password, userMetadata);
  await window.auth.login(email, password, true);
}

export function updateMetadata({
  address,
  postal_code, // eslint-disable-line
  city,
  full_name, // eslint-disable-line
  phone,
}) {
  const user = window.auth.currentUser();
  if (!user) { return Promise.resolve(); }

  return user.update({
    data: {
      address,
      postal_code,
      city,
      full_name,
      phone,
    },
  });
}
