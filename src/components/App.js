import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import EmailVerification from './EmailVerification';
import { loadItem } from '../utils/localStorage';

export const App = props => {
  const [loggedIn, setLoggedIn]= useState(loadItem('token'));

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => (loggedIn ? <Redirect to='/home' /> : <Landing setLoggedIn={setLoggedIn} />)} />
          <Route path="/home" exact render={() => (!loggedIn ? <Redirect to='/' /> : <Home setLoggedIn={setLoggedIn} />)} />
          <Route path="/email/verify" exact render={() => (loggedIn ? <Redirect to="/home" /> : <EmailVerification setLoggedIn={setLoggedIn} />)} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
};

export default App;
