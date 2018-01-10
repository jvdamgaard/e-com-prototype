/* eslint no-param-reassign: 0 */
const contentfulManagement = require('contentful-management');

const client = contentfulManagement.createClient({
  accessToken: process.env.CTF_CM_ACCESS_TOKEN,
});

const getSpace = client.getSpace(process.env.CTF_SPACE_ID);

function getUser(id) {
  return getSpace.then(space => space.getEntry(id));
}

function createBasketItem(item) {
  return getSpace
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

function deleteBasketItem(item) {
  return getSpace
    .then(space => space.getEntry(item.sys.id))
    .then(entry => entry.unpublish())
    .then(entry => entry.delete());
}

function removeBasketItems(user) {
  if (user.fields.basket) {
    user.fields.basket['da-DK'].map(deleteBasketItem);
  }
  return user;
}

function updateBasket(user, event) {
  const basket = JSON.parse(event.body);
  return Promise.all(basket.items.map(createBasketItem))
    .then((basketItems) => {
      user.fields.basket = {
        'da-DK': basketItems.map(basketItem => ({
          sys: {
            id: basketItem.sys.id,
            linkType: 'Entry',
            type: 'Link',
          },
        })),
      };
      return user;
    });
}

exports.handler = (event, context, callback) => {
  getUser(event.queryStringParameters.cf_user_id)
    .then(user => removeBasketItems(user))
    .then(user => updateBasket(user, event))
    .then(user => user.update())
    .then(user => user.publish())
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    .catch(e => callback(e));
};
