import { ActionTypes } from "../actions/regionAction";
const INITIAL_STATE = {
    regions: null,
    region: null,
    isSuccess: false,
    messageFail: null,
    isLoadding: false,
};

const regionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case (ActionTypes.GET_REGION_REQUEST):
            return {
                ...state,
                regions: null,
                isLoadding: true,
            }
        case (ActionTypes.GET_REGION_SUCCESS):
            return {
                ...state,
                regions: action.payload?.data?.regions,
                isSuccess: false,
                messageFail: null,
                isLoadding: false,
            }

        case (ActionTypes.GET_REGION_FAILURE):
            console.log(action.payload);
            return {
                ...state,
                regions: null,
                isSuccess: false,
                messageFail: null,
                isLoadding: false,
            }
        case (ActionTypes.CREATE_REGION_SUCCESS):
            return {
                ...state,
                regions: action.payload?.data?.regionCreate?.region,
                isSuccess: true,
                isLoadding: false,
            }
        case (ActionTypes.CREATE_REGION_FAILURE):
            return {
                ...state,
                regions: null,
                messageFail: action.payload,
                isLoadding: false,
            }

        case (ActionTypes.GET_REGION_BY_ID_REQUEST):
            return {
                ...state,
                region: null,
                isLoadding: true,
            }
        case (ActionTypes.GET_REGION_BY_ID_SUCCESS):
            console.log('data:', action.payload);
            return {
                ...state,
                region: action.payload?.data?.region,
                messageSuccess: false,
                messageFail: [],
                isLoadding: false,
            }
        case (ActionTypes.GET_REGION_BY_ID_FAILURE):
            return {
                ...state,
                region: null,
                isLoadding: false,
            }

        case ActionTypes.UPDATE_REGION_REQUEST:
            return {
                ...state,
                region: null,
                isLoadding: true,
            }
        case ActionTypes.UPDATE_REGION_SUCCESS:
            return {
                ...state,
                region: action.payload.data?.regionUpdate?.region,
                isSuccess: true,
                isLoadding: false,
            }
        case ActionTypes.UPDATE_REGION_FAILURE:
            return {
                ...state,
                company: null,
                messageFail: action.payload,
                isLoadding: false,
            }
        case (ActionTypes.LOADMORE_REGION_REQUEST):
            return {
                ...state,
                isLoadding: true,
            }
        case (ActionTypes.LOADMORE_REGION_SUCCESS):
            const beforeRegion = state.regions?.edges
            const afterRegion = action.payload?.data?.regions?.edges
            return {
                ...state,
                regions: { edges: [...beforeRegion, ...afterRegion], pageInfo: action.payload?.data?.regions?.pageInfo },
                isSuccess: false,
                messageFail: [],
                isLoadding: false,
            }
        case (ActionTypes.LOADMORE_REGION_FAILURE):
            return {
                ...state,
                isLoadding: false,
            }
        default:
            return state
    }
}
export default regionReducer