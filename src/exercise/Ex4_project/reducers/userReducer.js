import { ActionTypes } from "../actions/loginAction";
const INITIAL_STATE = {
  userInfor: null,
  isLoadding: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (ActionTypes.GET_USER_REQUEST):
      return {
        ...state,
        userInfor: null,
        isLoadding: true,
      }
    case (ActionTypes.GET_USER_SUCCESS):
      return {
        ...state,
        userInfor: action.payload,
        isLoadding: false,
      }
    case (ActionTypes.GET_USER_FAILURE):
      return {
        ...state,
        userInfor: null,
        isLoadding: false,
      }
    default:
      return state
  }
}
export default userReducer