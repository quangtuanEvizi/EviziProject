import { GlobalStyles } from './exercise/Ex4_project/constant/Global';
import { Provider } from 'react-redux'
import store from './exercise/Ex4_project/store';
import 'react-toastify/dist/ReactToastify.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Dashboard from './exercise/Ex4_project/view/dashboard/Dashboard';
import Login from './exercise/Ex4_project/view/login/Login';
import './App.scss'

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" component={Login}/>
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              {/* <Redirect from="*" to="/dashboard" /> */}
            </Switch>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
