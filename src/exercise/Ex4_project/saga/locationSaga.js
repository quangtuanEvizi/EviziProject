import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions/locationActions';
import { createLocation, getLocations } from '../api/location/location';

function* getLocationsSaga(action) {
  try {
    const data = yield call(getLocations, action.payload);
    yield put({ type: ActionTypes.GET_LOCATION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_LOCATION_FAILURE });
  }
}

function* createLocationsActionSaga(action) {
  try {
    const data = yield call(createLocation, action.payload);
    if(data.data?.locationCreate?.errors){
      yield put({ type: ActionTypes.CREATE_LOCATION_FAILURE,  payload: data?.data?.locationCreate?.errors });
    }
    else{
      yield put({  type: ActionTypes.CREATE_LOCATION_SUCCESS, payload: data });
    }
  } catch (e) {
    yield put({ type: ActionTypes.CREATE_LOCATION_FAILURE, payload: null });
  }
}

function* locationSaga() {
  yield takeEvery(ActionTypes.GET_LOCATION_REQUEST, getLocationsSaga);
  yield takeEvery(ActionTypes.CREATE_LOCATION_REQUEST, createLocationsActionSaga);
}

export default locationSaga