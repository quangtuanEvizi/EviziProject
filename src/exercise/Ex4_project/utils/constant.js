import axios from "axios";
import Cookies from 'universal-cookie';

export const STORAGE_TOKEN = 'jwt';
// export const GRAPHQL_ENDPOINT = 'http://192.168.1.189:3030/v2' 
export const GRAPHQL_ENDPOINT = 'https://app-s.record360.com/v2' 
const JWT = '';
export const HIGHEST_ROLE = ['superadmin', 'super_observer']
export const MANAGER_ROLE = [
  'region_manager',
  'manager',
  'superadmin',
  'super_observer'
]
export const USER_ROLE = ['user']
export const cookies = new Cookies();
export const getStorageToken = async () => {
  try {
    const token = await localStorage.getItem(STORAGE_TOKEN) || await cookies.get(STORAGE_TOKEN);
    return token;
  } catch (e) {
    return null;
  }
};
const getAuthorizationToken = async () => {
  const headers = {};
  try {
    const token = await getStorageToken() || JWT;
    if (token) {
      return { ...headers, ...{ Authorization: `Token ${token}` } };
    }
    else {
      return headers;
    }
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};
export const httpPost = (data) => {
  return getAuthorizationToken()
    .then(headers => {
      return axios.post(
        GRAPHQL_ENDPOINT,
        data,
        {
          headers,
          withCredentials: false
        }
      );
    })
    .then(data => data?.data)
    .catch(ex => ex);
};