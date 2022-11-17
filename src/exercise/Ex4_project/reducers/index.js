import { combineReducers } from 'redux'
import companiesReducer from './companyReducer';
import inspectionReducer from './inspectionReducer';
import locationReducer from './locationsReducer';
import loginReducer from './loginReducer';
import regionReducer from './regionReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  companyReducer: companiesReducer,
  regionReducer: regionReducer,
  locationReducer: locationReducer,
  inspectionReducer: inspectionReducer
});

export default rootReducer
