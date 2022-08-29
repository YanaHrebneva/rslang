import axios from '../utils/axios';

const BASE_URL = 'https://rslang-yanahrebneva.herokuapp.com/';
const paths = {
  users: 'users/',
  words: '/words',
};

export default class UserApi {
  static async getUserWords(userId) {
    if (userId) {
      const response = await axios.get(`${BASE_URL}${paths.users}${userId}${paths.words}`).then(({ data }) => data)
        .catch((error) => console.error(error));
      return response;
    }
    return 'please signing';
  }

  static async addedUserHardWord(userId, wordId) {
    if (userId) {
      axios.post(`${BASE_URL}${paths.users}${userId}${paths.words}/${wordId}`, {
        difficulty: 'hard',
        optional: {},
      })
        .then(() => console.log('added hard word'))
        .catch((error) => console.error(error));
    }
    return 'please signing';
  }
}
