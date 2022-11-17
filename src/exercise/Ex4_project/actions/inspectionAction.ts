export const ActionTypes = {
    GET_INSPECTION_REQUEST: 'GET_INSPECTION_REQUEST',
    GET_INSPECTION_SUCCESS: 'GET_INSPECTION_SUCCESS',
    GET_INSPECTION_FAILURE: 'GET_INSPECTION_FAILURE'
}

export const actionGetInspection = (payload:any) => {
    return {
      type: ActionTypes.GET_INSPECTION_REQUEST,
      payload,
    };
  };

export default ActionTypes;