import { ActionTypes } from "../actions/inspectionAction";
const INITIAL_STATE = {
  inspections: null,
  isLoadding: false,

};
const inspectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (ActionTypes.GET_INSPECTION_REQUEST):
      return {
        ...state,
        inspections: null,
        isLoadding: true,

      }
    case (ActionTypes.GET_INSPECTION_SUCCESS):
      return {
        ...state,
        inspections: action.payload?.data?.inspections,
        isLoadding: false,

      }
    case (ActionTypes.GET_INSPECTION_FAILURE):
      return {
        ...state,
        inspections: null,
        isLoadding: false,

      }
    default:
      return state
  }
}
export default inspectionReducer