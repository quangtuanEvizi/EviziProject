export const ActionTypes = {
  GET_LOCATION_REQUEST: 'GET_LOCATION_REQUEST',
  GET_LOCATION_SUCCESS: 'GET_LOCATION_SUCCESS',
  GET_LOCATION_FAILURE: 'GET_LOCATION_FAILURE',
  CREATE_LOCATION_REQUEST: 'CREATE_LOCATION_REQUEST',
  CREATE_LOCATION_SUCCESS: 'CREATE_LOCATION_SUCCESS',
  CREATE_LOCATION_FAILURE: 'CREATE_LOCATION_FAILURE',
};

export const actionGetLocations = (payload:any) => {
  return {
    type: ActionTypes.GET_LOCATION_REQUEST,
    payload,
  };
};
export const actionCreateLocations = (payload:any) => {
  return {
    type: ActionTypes.CREATE_LOCATION_REQUEST,
    payload,
  };
}; 

export default ActionTypes;