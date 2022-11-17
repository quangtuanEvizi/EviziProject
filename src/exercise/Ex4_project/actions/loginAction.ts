export const ActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
};

export const actionLogin = (payload: any) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    payload,
  };
};
export const actionGetUser = (payload:any) => {
  return {
    type: ActionTypes.GET_USER_REQUEST,
    payload
  };
};

export default ActionTypes;