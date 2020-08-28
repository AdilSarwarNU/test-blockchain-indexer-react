import axios from 'axios'
import Auth from "./Auth";

const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});

const getConfig = token => ({
  headers: {
    Authorization: `${token}`,
    'crossDomain': true,
    withCredentials: true
  }
});

export {
  Auth, getConfig
}

export default Api;
