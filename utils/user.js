/* eslint no-param-reassign: 0 */
import sha256 from 'hash.js/lib/hash/sha/256';
import * as contentful from '../plugins/contentful';

export function getUser() {
  if (!window.localStorage.getItem('userId')) {
    return Promise.reject();
  }

  return contentful.deliveryClient
    .getEntry(window.localStorage.getItem('userId'));
}

export function getEditableUser() {
  if (!window.localStorage.getItem('userId')) {
    return Promise.reject();
  }

  return contentful.managementClient
    .getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.getEntry(window.localStorage.getItem('userId')));
}

export function uploadBasket(basket) {
  return getEditableUser()
    .then((user) => {
      user.fields.basket['da-DK'] = basket.items.map(item => ({
        product: { id: item.product.id },
        quantity: item.quantity,
      }));
      return user.update();
    })
    .then(user => user.publish());
}

export function uploadLastSeen(lastSeen) {
  return getEditableUser()
    .then((user) => {
      user.fields.lastSeen['da-DK'] = lastSeen.map(item => ({ id: item.id }));
      return user.update();
    })
    .then(user => user.publish());
}

export function createUser(data) {
  return contentful.managementClient.getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.createEntry('user', {
      fields: {
        name: { 'da-DK': data.name },
        email: { 'da-DK': data.email },
        address: { 'da-DK': data.address },
        phone: { 'da-DK': data.phone },
        password: { 'da-DK': sha256().update(data.password).digest('hex') },
      },
    }))
    .then(user => user.publish());
}

export function updateUser(data) {
  return getEditableUser()
    .then((user) => {
      user.fields.name['da-DK'] = data.name;
      user.fields.email['da-DK'] = data.email;
      user.fields.address['da-DK'] = data.address;
      user.fields.phone['da-DK'] = data.phone;
      return user.update();
    })
    .then(user => user.publish());
}
