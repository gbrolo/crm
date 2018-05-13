import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reducer from './reducers';
import MainActivity from './components/MainActivity';
import AuthScreen from "./components/AuthScreen";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={AuthScreen} />
          <Route path="/dashboard" component={MainActivity} />
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
