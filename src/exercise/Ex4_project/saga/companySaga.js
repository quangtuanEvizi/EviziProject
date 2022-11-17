import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions/companyAction';
import { getCompanies, createCompany, getCompanyById, updateCompany } from '../api/company/company';

function* getCompanyActionSaga(action) {
  try {
    const data = yield call(getCompanies, action.payload);
    yield put({ type: ActionTypes.GET_COMPANY_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.GET_COMPANY_FAILURE });
  }
}

function* getCompanyByIdActionSaga(action) {
  try {
    const company = yield call(getCompanyById, action.payload);
    yield put({ type: ActionTypes.GET_COMPANY_BY_ID_SUCCESS, payload: company });
  } catch (e) {
    yield put({ type: ActionTypes.GET_COMPANY_BY_ID_FAILURE });
  }
}

function* createCompanyActionSaga(action) {
  try {
    const data = yield call(createCompany, action.payload);
    if(data.data?.companyCreate?.errors){
        yield put({ type: ActionTypes.CREATE_COMPANY_FAILURE,  payload: data?.data?.companyCreate?.errors });
    }
    else{
        yield put({  type: ActionTypes.CREATE_COMPANY_SUCCESS, payload: data });
    }
  } catch (e) {
    yield put({ type: ActionTypes.CREATE_COMPANY_FAILURE, payload: null });
  }
}

function* updateCompanySaga(action) {
  try {
    const data = yield call(updateCompany, action.payload.companyId, action.payload.values);
    if(data?.data?.companyUpdate?.errors){
      yield put({ type: ActionTypes.UPDATE_COMPANY_FAILURE,  payload: data?.data?.companyUpdate?.errors });
    }
    else{
      yield put({  type: ActionTypes.UPDATE_COMPANY_SUCCESS, payload: data });
    }
  } catch (e) {
    yield put({ type: ActionTypes.UPDATE_COMPANY_FAILURE });
  }
}

function* loadMoreCompanyActionSaga(action) {
  try {
    const data = yield call(getCompanies, action.payload);
    yield put({ type: ActionTypes.LOADMORE_COMPANY_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: ActionTypes.LOADMORE_COMPANY_FAILURE });
  }
}

function* companySaga() {
  yield takeEvery(ActionTypes.GET_COMPANY_REQUEST, getCompanyActionSaga);
  yield takeEvery(ActionTypes.CREATE_COMPANY_REQUEST, createCompanyActionSaga)
  yield takeEvery(ActionTypes.GET_COMPANY_BY_ID_REQUEST, getCompanyByIdActionSaga)
  yield takeEvery(ActionTypes.UPDATE_COMPANY_REQUEST, updateCompanySaga)
  yield takeEvery(ActionTypes.LOADMORE_COMPANY_REQUEST, loadMoreCompanyActionSaga)
}
export default companySaga