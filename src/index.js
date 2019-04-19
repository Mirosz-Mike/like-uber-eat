import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Login from './components/users/Login';
import Register from './components/users/Register';
import Notfound from './components/Notfound';

const routing = (
  <div>
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  </div>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

