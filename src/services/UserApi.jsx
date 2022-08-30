import axios, { baseUrl } from '../utils/axios';

const paths = {
  users: 'users/',
  words: '/words/',
  aggregatedWords: '/aggregatedWords',
};

export default class UserApi {
  static async getUserWords(userId) {
    if (userId) {
      const response = await axios.get(`${baseUrl}/${paths.users}${userId}${paths.words}`)
        .catch((error) => console.error(error));
      return response;
    }
    return 'please signing';
  }

  static async addedUserHardWord(userId, wordId) {
    if (userId) {
      return axios.post(`${baseUrl}/${paths.users}${userId}${paths.words}/${wordId}`, {
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
      return axios.get(`${baseUrl}/${paths.users}${userId}${paths.aggregatedWords}${wordId}`)
        .then(() => console.log('I have hard word'))
        .catch((error) => console.error(error));
    }
    return 'please signing';
  }

  static async getUserAggregatedWords(userId, wordsPerPage, filter) {
    if (userId) {
      return axios.get(
        `${baseUrl}/${paths.users}${userId}${paths.aggregatedWords}`,
        { params: { wordsPerPage, filter } },
      ).catch((error) => console.error(error));
    }
  }

  static async deleteUserWord(userId, wordId) {
    if (userId) {
      axios.delete(
        `${baseUrl}/${paths.users}${userId}${paths.words}/${wordId}`,
      ).catch((error) => console.error(error));
    }
    return 'please signing';
  }
}
