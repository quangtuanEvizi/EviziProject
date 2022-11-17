import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions/regionAction';
import { createRegion, getRegionById, getRegions, updateRegion } from '../api/region/region';

function* getRegionSaga(action) {
  try {
    const data = yield call(getRegions, action.payload);
    yield put({ type: ActionTypes.GET_REGION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_REGION_FAILURE });
  }
}

function* createRegionsActionSaga(action) {
  try {
    const data = yield call(createRegion, action.payload);
    if(data.data?.regionCreate?.errors){
        yield put({ type: ActionTypes.CREATE_REGION_FAILURE,  payload: data?.data?.regionCreate?.errors });
    }
    else{
        yield put({  type: ActionTypes.CREATE_REGION_SUCCESS, payload: data });
    }
  } catch (e) {
    yield put({ type: ActionTypes.CREATE_REGION_FAILURE, payload: null });
  }
}
function* getRegionByIdActionSaga(action) {
  try {
    const data = yield call(getRegionById, action.payload);
    yield put({ type: ActionTypes.GET_REGION_BY_ID_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_REGION_BY_ID_FAILURE });
  }
}

function* updateRegionSaga(action) {
  try {
    const data = yield call(updateRegion, action.payload.regionId, action.payload.values);
    if(data?.data?.regionUpdate?.errors){
      yield put({ type: ActionTypes.UPDATE_REGION_FAILURE,  payload: data?.data?.companyUpdate?.errors });
    }
    else{
      yield put({  type: ActionTypes.UPDATE_REGION_SUCCESS, payload: data });
    }
  } catch (e) {
    yield put({ type: ActionTypes.UPDATE_REGION_FAILURE });
  }
}

function* loadMoreRegionsActionSaga(action) {
  try {
    const data = yield call(getRegions, action.payload);
    yield put({ type: ActionTypes.LOADMORE_REGION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.LOADMORE_REGION_FAILURE });
  }
}
function* regionSaga() {
  yield takeEvery(ActionTypes.GET_REGION_REQUEST, getRegionSaga);
  yield takeEvery(ActionTypes.CREATE_REGION_REQUEST, createRegionsActionSaga);
  yield takeEvery(ActionTypes.GET_REGION_BY_ID_REQUEST, getRegionByIdActionSaga);
  yield takeEvery(ActionTypes.UPDATE_REGION_REQUEST, updateRegionSaga)
  yield takeEvery(ActionTypes.LOADMORE_REGION_REQUEST, loadMoreRegionsActionSaga)
}

export default regionSaga