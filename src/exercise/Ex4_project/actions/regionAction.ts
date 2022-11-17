export const ActionTypes = {
  GET_REGION_REQUEST: 'GET_REGION_REQUEST',
  GET_REGION_SUCCESS: 'GET_REGION_SUCCESS',
  GET_REGION_FAILURE: 'GET_REGION_FAILURE',
  CREATE_REGION_REQUEST: 'CREATE_REGION_REQUEST',
  CREATE_REGION_SUCCESS: 'CREATE_REGION_SUCCESS',
  CREATE_REGION_FAILURE: 'CREATE_REGION_FAILURE',
  GET_REGION_BY_ID_REQUEST: 'GET_REGION_BY_ID_REQUEST',
  GET_REGION_BY_ID_SUCCESS: 'GET_REGION_BY_ID_SUCCESS',
  GET_REGION_BY_ID_FAILURE: 'GET_REGION_BY_ID_FAILURE',
  UPDATE_REGION_REQUEST: 'UPDATE_REGION_REQUEST',
  UPDATE_REGION_SUCCESS: 'UPDATE_REGION_SUCCESS',
  UPDATE_REGION_FAILURE: 'UPDATE_REGION_FAILURE',
  LOADMORE_REGION_REQUEST: 'LOADMORE_REGION_REQUEST',
  LOADMORE_REGION_SUCCESS: 'LOADMORE_REGION_SUCCESS',
  LOADMORE_REGION_FAILURE: 'LOADMORE_REGION_FAILURE',
};

export const actionGetRegions = (payload:any) => {
  return {
    type: ActionTypes.GET_REGION_REQUEST,
    payload,
  };
};
export const actionCreateRegions = (payload:any) => {
  return {
    type: ActionTypes.CREATE_REGION_REQUEST,
    payload,
  };
};
export const actionGetRegionById = (payload:any) => {
  return {
    type: ActionTypes.GET_REGION_BY_ID_REQUEST,
    payload,
  }
}
export const actionUpdateRegions = (payload:any) => {
  return {
    type: ActionTypes.UPDATE_REGION_REQUEST,
    payload,
  }
}
export const loadMoreRegionRequest = (payload:any) => {
  return {
    type: ActionTypes.LOADMORE_REGION_REQUEST,
    payload
  }
}
export default ActionTypes;