import Api, {getConfig} from './index';
import Response from './Response';

const { next } = Response;

export default {
  list: async ({q='', token = '', page = 1, per_page = 10} = {}) => {
    let endpoint = `http://localhost:3000/api/v1/transactions?q=${q}&page=${page}&per_page=${per_page}`;
    try {
      let response = await Api.get(endpoint, getConfig(token));
      return response;
    } catch (e) {
      next(e.response);
    }
  },

  details: async (id, {token = ''} = {}) => {
    let endpoint = `/transactions/${id}`;
    try {
      let response = await Api.get(endpoint, getConfig(token));
      return response;
    } catch (e) {
      next(e.response);
    }
  }
};
