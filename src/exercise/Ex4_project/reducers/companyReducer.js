import { ActionTypes } from "../actions/companyAction";
const INITIAL_STATE = {
  companies: null,
  company: null,
  messageSuccess: false,
  messageFail: null,
  isLoadding: false,
};
const companiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case (ActionTypes.GET_COMPANY_REQUEST):
      return {
        ...state,
        companies: null,
        isLoadding: true,
      }
    case (ActionTypes.GET_COMPANY_SUCCESS):
      return {
        ...state,
        companies: action.payload?.data?.companies,
        messageSuccess: false,
        messageFail: [],
        isLoadding: false,

      }
    case (ActionTypes.GET_COMPANY_FAILURE):
      return {
        ...state,
        companies: null,
        isLoadding: false,

      }

    case (ActionTypes.GET_COMPANY_BY_ID_REQUEST):
      return {
        ...state,
        company: null,
        isLoadding: true,

      }
    case (ActionTypes.GET_COMPANY_BY_ID_SUCCESS):
      
      return {
        ...state,
        company: action.payload?.data?.company,
        messageSuccess: false,
        messageFail: [],
        isLoadding: false,
      }
    case (ActionTypes.GET_COMPANY_BY_ID_FAILURE):
      return {
        ...state,
        company: null,
        isLoadding: false,
      }

    case (ActionTypes.CREATE_COMPANY_SUCCESS):
      return {
        ...state,
        companies: action.payload,
        messageSuccess: true,
        isLoadding: false,
      }
    case (ActionTypes.CREATE_COMPANY_FAILURE):
      return {
        ...state,
        companies: action.payload,
        messageFail: action.payload,
        isLoadding: false,
      }

      case ActionTypes.UPDATE_COMPANY_REQUEST:
        return {
          ...state,
          company: null,
          isLoadding: true,
        }
      case ActionTypes.UPDATE_COMPANY_SUCCESS:
        return {
          ...state,
          company: action.payload.data?.companyUpdate?.company,
          messageSuccess: true,
          isLoadding: false,
        }
      case ActionTypes.UPDATE_COMPANY_FAILURE:
        return {
          ...state,
          company: null,
          messageFail: action.payload,
          isLoadding: false,
        }

        case (ActionTypes.LOADMORE_COMPANY_REQUEST):
          return {
            ...state,
            isLoadding: true,
          }
        case (ActionTypes.LOADMORE_COMPANY_SUCCESS):
          const beforeCompany = state.companies?.edges
          const afterCompany = action.payload?.data?.companies?.edges
          return {
            ...state,
            companies: {edges: [...beforeCompany, ...afterCompany], pageInfo: action.payload?.data?.companies?.pageInfo},
            messageSuccess: false,
            messageFail: [],
            isLoadding: false,
          }
        case (ActionTypes.LOADMORE_COMPANY_FAILURE):
          return {
            ...state,
            isLoadding: false,
          }
    default:
      return state
  }
}
export default companiesReducer