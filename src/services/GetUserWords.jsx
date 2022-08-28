import axios from '../utils/axios';

const BASE_URL = 'https://rslang-yanahrebneva.herokuapp.com/';
const paths = {
  users: 'users/',
  words: '/words',
};

export default class UserApi {
  static getUserWords() {
    const currentToken = localStorage.getItem('auth-token');
    const id = JSON.parse(localStorage.getItem('user-data')).userId;

    if (id && currentToken) {
      return axios.get(`${BASE_URL}${paths.users}${id}${paths.words}`)
        .then(({ data }) => data)
        .catch((error) => console.error(error), {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            Accept: 'application/json',
          },
        });
    }
    return 'please signing';
  }

  // static registration(name, email, password) {
  //   return axios.post(paths.users, { name, email, password });
  // }

  // static getUser(userId) {
  //   return axios.get(`${paths.users}/${userId}`);
  // }
}
