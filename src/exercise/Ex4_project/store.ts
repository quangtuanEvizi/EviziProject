import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index";
import loginSaga from "./saga/loginSaga";
import { spawn } from "redux-saga/effects";
import getUserSaga from "./saga/getUserSaga";
import companySaga from "./saga/companySaga";
import regionSaga from "./saga/regionSaga";
import locationSaga from "./saga/locationSaga";
import inspectionSaga from "./saga/inspectionSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware( logger, sagaMiddleware));
// const store = createStore(rootReducer, applyMiddleware( sagaMiddleware));
function* rootSaga() {
  yield spawn(loginSaga);
  yield spawn(getUserSaga);
  yield spawn(companySaga);
  yield spawn(regionSaga);
  yield spawn(locationSaga);
  yield spawn(inspectionSaga);
}
sagaMiddleware.run(rootSaga);
export default store;
