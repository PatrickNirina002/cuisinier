import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Chacun from './components/chacun';
import PostFrontToBack from './components/postWithUpload_frontToBack';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inscrire from './components/inscrire';
import Modifier from './components/update';
import FooterPage from './components/footer';
// import Slider from './components/slider'
//import Admin from './components/Admin';
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
             
                <Route exact path="/client" component={ Home } />
                <div className="container">
                  <Route exact path="/register" component={ Register } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/atelier" component={ PostFrontToBack } />
                  <Route exact path="/register/:_id" component={ Chacun } />
                  <Route path="/particulier/:_id"  component={Inscrire} ></Route>
                  <Route path="/profil/:_id"  component={Modifier} ></Route>
                  {/* <Route path="/dash"  component={Admin} ></Route> */}
                </div>
                <FooterPage/>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
