import { authRequest } from "./axios"

export const graphQlRequest = async (data) => {
  const response = await authRequest({
    url: '/',
    method: "POST",
    data
  })
  return response
}