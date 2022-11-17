import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions/loginAction';
import { getUserRequest } from '../api/login/login';

function* getUserActionSaga(action) {
  try {
    const data = yield call(getUserRequest, action.payload);
    yield put({ type: ActionTypes.GET_USER_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_USER_FAILURE });
  }
}

function* getUserSaga() {
  yield takeEvery(ActionTypes.GET_USER_REQUEST, getUserActionSaga);
}

export default getUserSaga