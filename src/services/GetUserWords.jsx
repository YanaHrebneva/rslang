import axios from '../utils/axios';

const BASE_URL = 'https://rslang-yanahrebneva.herokuapp.com/';
const paths = {
  users: 'users/',
  words: '/words/',
  aggregatedWords: '/aggregatedWords',
};

export default class UserApi {
  static async getUserWords(userId) {
    if (userId) {
      const response = await axios.get(`${BASE_URL}${paths.users}${userId}${paths.words}`)
        .catch((error) => console.error(error));
      return response;
    }
    return 'please signing';
  }

  static async addedUserHardWord(userId, wordId) {
    console.log(userId, wordId);
    if (userId) {
      return axios.post(`${BASE_URL}${paths.users}${userId}${paths.words}/${wordId}`, {
        difficulty: 'hard',
        optional: {},
      })
        .then(() => console.log('added hard word'))
        .catch((error) => console.error(error));
    }
    return 'please signing';
  }

  static async getUserAggregatedWord(userId, wordId) {
    if (userId) {
      return axios.get(`${BASE_URL}${paths.users}${userId}${paths.aggregatedWords}${wordId}`)
        .then(() => console.log('I have hard word'))
        .catch((error) => console.error(error));
    }
    return 'please signing';
  }

  static async getUserAggregatedWords(userId) {
    if (userId) {
      return axios.get(
        `${BASE_URL}${paths.users}${userId}${paths.aggregatedWords}`,
        { params: { filter: { 'userWord.difficulty': 'hard' }, wordsPerPage: 40 } },
      ).catch((error) => console.error(error));
    }
    return 'please signing';
  }

  static async deleteUserWord(userId, wordId) {
    if (userId) {
      axios.delete(
        `${BASE_URL}${paths.users}${userId}${paths.words}/${wordId}`,
      ).catch((error) => console.error(error));
    }
    return 'please signing';
  }
}
