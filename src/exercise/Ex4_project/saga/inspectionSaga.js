import { call, put, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../actions/inspectionAction';
import { getInspection } from '../api/inspection/inspection';

function* getInspectionActionSaga(action) {
  try {
    const data = yield call(getInspection, action.payload);
    yield put({ type: ActionTypes.GET_INSPECTION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_INSPECTION_FAILURE });
  }
}

function* inspectionSaga() {
  yield takeEvery(ActionTypes.GET_INSPECTION_REQUEST, getInspectionActionSaga);
}

export default inspectionSaga