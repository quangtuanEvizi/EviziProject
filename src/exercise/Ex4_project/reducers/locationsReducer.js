import { ActionTypes } from "../actions/locationActions";
const INITIAL_STATE = {
  locations: null,
  location: null,
  isSuccess: false,
  messageFail: null,
  isLoadding: false,

};
const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (ActionTypes.GET_LOCATION_REQUEST):
      return {
        ...state,
        locations: null,
        isLoadding: true,
      }
    case (ActionTypes.GET_LOCATION_SUCCESS):
      return {
        ...state,
        locations: action.payload?.data?.locations,
        isSuccess: false,
        messageFail: [],
        isLoadding: false,


      }
    case (ActionTypes.GET_LOCATION_FAILURE):
      return {
        ...state,
        locations: null,
        isLoadding: false,

      }

    case (ActionTypes.CREATE_COMPANY_REQUEST):
      return {
        ...state,
        isLoadding: true,
      }

    case (ActionTypes.CREATE_LOCATION_SUCCESS):
      return {
        ...state,
        locations: action.payload,
        isSuccess: true,
        isLoadding: false,

      }
    case (ActionTypes.CREATE_LOCATION_FAILURE):
      return {
        ...state,
        locations: action.payload,
        messageFail: action.payload,
        isLoadding: false,

      }
    default:
      return state
  }
}
export default locationReducer