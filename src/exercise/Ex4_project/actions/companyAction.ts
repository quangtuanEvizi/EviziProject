export const ActionTypes = {
  GET_COMPANY_REQUEST: 'GET_COMPANY_REQUEST',
  GET_COMPANY_SUCCESS: 'GET_COMPANY_SUCCESS',
  GET_COMPANY_FAILURE: 'GET_COMPANY_FAILURE',
  CREATE_COMPANY_REQUEST: 'CREATE_COMPANY_REQUEST',
  CREATE_COMPANY_SUCCESS: 'CREATE_COMPANY_SUCCESS',
  CREATE_COMPANY_FAILURE: 'CREATE_COMPANY_FAILURE',
  GET_COMPANY_BY_ID_REQUEST: 'GET_COMPANY_BY_ID_REQUEST',
  GET_COMPANY_BY_ID_SUCCESS: 'GET_COMPANY_BY_ID_SUCCESS',
  GET_COMPANY_BY_ID_FAILURE: 'GET_COMPANY_BY_ID_FAILURE',
  UPDATE_COMPANY_REQUEST: 'UPDATE_COMPANY_REQUEST',
  UPDATE_COMPANY_SUCCESS: 'UPDATE_COMPANY_SUCCESS',
  UPDATE_COMPANY_FAILURE: 'UPDATE_COMPANY_FAILURE',
  LOADMORE_COMPANY_REQUEST: 'LOADMORE_COMPANY_REQUEST',
  LOADMORE_COMPANY_SUCCESS: 'LOADMORE_COMPANY_SUCCESS',
  LOADMORE_COMPANY_FAILURE: 'LOADMORE_COMPANY_FAILURE',
};

export const actionGetCompany = (payload:any) => {
  return {
    type: ActionTypes.GET_COMPANY_REQUEST,
    payload,
  };
};
export const actionCreateCompany = (payload:any) => {
  return {
    type: ActionTypes.CREATE_COMPANY_REQUEST,
    payload,
  };
}
export const actionGetCompanyById = (payload:any) => {
  return {
    type: ActionTypes.GET_COMPANY_BY_ID_REQUEST,
    payload,
  };
}
export const actionUpdateCompanyRequest = (payload:any) => {
  return {
    type: ActionTypes.UPDATE_COMPANY_REQUEST,
    payload
  }
}
export const loadMoreCompanyRequest = (payload:any) => {
  return {
    type: ActionTypes.LOADMORE_COMPANY_REQUEST,
    payload
  }
}
export default ActionTypes;