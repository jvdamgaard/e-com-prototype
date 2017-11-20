/* eslint no-param-reassign: 0 */
import sha256 from 'hash.js/lib/hash/sha/256';
import * as contentful from '../plugins/contentful';

export function getUser() {
  if (!window.localStorage.getItem('userId')) {
    return Promise.reject();
  }

  return contentful.deliveryClient
    .getEntries({
      'sys.id': window.localStorage.getItem('userId'),
      include: 2,
    })
    .then(entries => entries.items[0]);
}

export function getEditableUser() {
  if (!window.localStorage.getItem('userId')) {
    return Promise.reject();
  }

  return contentful.managementClient
    .getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.getEntry(window.localStorage.getItem('userId')));
}

export function createBasketItem(item) {
  return contentful.managementClient
    .getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.createEntry('basketItem', {
      fields: {
        quantity: { 'da-DK': item.quantity },
        product: {
          'da-DK': {
            sys: {
              id: item.product.id,
              linkType: 'Entry',
              type: 'Link',
            },
          },
        },
      },
    }))
    .then(entry => entry.publish());
}

export function deleteBasketItem(item) {
  console.log('Delete', item);
  return contentful.managementClient
    .getSpace(process.env.CTF_SPACE_ID)
    .then(space => space.getEntry(item.sys.id))
    .then(entry => entry.unpublish())
    .then(entry => entry.delete());
}

// TODO
export function uploadBasket(basket) {
  let oldBasketItems = [];
  return getEditableUser()
    .then(user => Promise.all(basket.items.map(createBasketItem))
      .then((basketItems) => {
        if (user.fields.basket) {
          oldBasketItems = user.fields.basket['da-DK'];
          console.log(oldBasketItems);
        }
        user.fields.basket = {
          'da-DK': basketItems.map(basketItem => ({
            sys: {
              id: basketItem.sys.id,
              linkType: 'Entry',
              type: 'Link',
            },
          })),
        };
        return user.update();
      }))
    .then(user => user.publish())

    // Clean up old basket items
    .then(() => Promise.all(oldBasketItems.map(deleteBasketItem)));
}

export function uploadLastSeen(lastSeen) {
  return getEditableUser()
    .then((user) => {
      user.fields.lastSeen = {
        'da-DK': lastSeen.map(item => ({
          sys: {
            id: item.id,
            linkType: 'Entry',
            type: 'Link',
          },
        })),
      };
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
