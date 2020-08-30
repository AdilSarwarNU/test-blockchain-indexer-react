import Api, {getConfig} from './index';
import Response from './Response';

const { next } = Response;

export default {
    list: async (transaction_id, {token = ''} = {}) => {
        let endpoint = `/transactions/${transaction_id}/comments`;
        try {
            return await Api.get(endpoint, getConfig(token));
        } catch (e) {
            next(e.response);
        }
    },
    create: async (body, transaction_id, {token = ''} = {}) => {
        let endpoint = `/comments`;
        let payload = {
            comment: {
                body,
                transaction_id
            }
        };
        try {
            let response = await Api.post(endpoint, payload, getConfig(token));
            return response;
        } catch (e) {
            next(e.response);
        }
    }
};
