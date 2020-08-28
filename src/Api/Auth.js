import Api, {getConfig} from './index';
import Response from './Response';

const { next } = Response;

const Auth = {
  signIn: async (email, password) => {
    const endpoint = `http://localhost:3000/api/v1/auth/login`;
    try {
      let response = await Api.post(endpoint, {
        user: {
          email, password
        }
      });
      if(!response.data.result)
        next({data: {error_code: 'user_not_authorized', error: true}});
      else
        return response;
    } catch (e) {
      next(e.response);
    }
  },

  validateRequest: async (token) => {
    let endpoint = `/auth/validate-request`;

    try {
      return await Api.post(endpoint, {
        token
      });
    } catch (e) {
      next(e.response);
    }
  }
};

export default Auth;
