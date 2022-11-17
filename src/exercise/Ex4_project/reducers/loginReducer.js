import { ActionTypes } from "../actions/loginAction";
const INITIAL_STATE = {
  user: null,
  isLoadding: false,
  messageError: []

};
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (ActionTypes.LOGIN_REQUEST):
      return {
        ...state,
        user: null,
        isLoadding: true,
      }
    case (ActionTypes.LOGIN_SUCCESS):
      return {
        ...state,
        user: action.payload,
        isLoadding: false,
      }
    case (ActionTypes.LOGIN_FAILURE):
      return {
        ...state,
        user: null,
        isLoadding: false,
        messageError: action.payload?.data?.errors
      }
    default:
      return state
  }
}
export default loginReducer