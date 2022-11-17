import axios from 'axios'
import { GRAPHQL_ENDPOINT, STORAGE_TOKEN } from '../utils/constant'
import { LocalStorage } from '../utils/localStorage'
import Cookies from 'universal-cookie';

const authRequest = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  timeout: 2000,
})
export const cookies = new Cookies();
authRequest.interceptors.request.use(async (request) => {
  const token = await LocalStorage.get(STORAGE_TOKEN) ||  await cookies.get(STORAGE_TOKEN);
  if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
})

authRequest.interceptors.response.use((response) => {
  return { data: response.data, statusCode: response.status }
})
export { authRequest }