import axios from 'axios';

const baseUrl = 'https://rslang-yanahrebneva.herokuapp.com';

const instance = axios.create({
  baseURL: baseUrl,
});

export const path = {
  users: '/users',
  signIn: '/signin',
};

const errorHandler = (err) => ({
  successful: false,
  code: err.response.status,
  message: err.response.data,
});

export default class UserService {
  static login(email, password) {
    return instance.post(path.signIn, { email, password })
      .then((resp) => ({
        successful: true,
        data: resp.data,
      }))
      .catch(errorHandler);
  }
}
