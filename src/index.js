import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import reducer from './reducers';
import MainActivity from './components/MainActivity';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainActivity} />
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
