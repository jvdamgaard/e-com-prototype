import GoTrue from 'gotrue-js';

const auth = new GoTrue({ setCookie: true });

// auth.signup('jakobviskumdamgaard@gmail.com', '3kanter').then(
//   response => console.log('User created', response),
//   error => console.log('Error during signup', error),
// );

auth.login('jakobviskumdamgaard@gmail.com', '3kanter').then(
  user => console.log('Logged in as', user),
  error => console.log('Failed to log in', error),
);

export default auth;
