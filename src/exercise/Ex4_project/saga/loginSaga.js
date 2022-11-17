import { call, put, takeEvery } from 'redux-saga/effects';
import { login } from '../api/login/login'
import { ActionTypes } from '../actions/loginAction';


function* loginActionSaga(action) {
  try {
    const data = yield call(login, action.payload);
    if (data?.data?.data?.authenticate) {
      yield put({ type: ActionTypes.LOGIN_SUCCESS, payload: data });
    }
    else {
      yield put({ type: ActionTypes.LOGIN_FAILURE, payload: data  });
    }
  } catch (e) {
    yield put({ type: ActionTypes.LOGIN_FAILURE});
  }
}

function* loginSaga() {
  yield takeEvery(ActionTypes.LOGIN_REQUEST, loginActionSaga);
}

export default loginSaga