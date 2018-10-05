/* global __DEVTOOLS__ __USE_GA__ __GA_ID__ */
/* eslint global-require:0 */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import App from 'modules/app';
import configureStore from './store/configureStore';
import { init } from './middlewares/socketio';
import './grids.css';

const history = createHistory();
const store = configureStore({}, history);
init(store);

if (__USE_GA__) {
  const ga = require('react-ga');
  ga.initialize(__GA_ID__);
}

const routes = (
  <ConnectedRouter history={history}>
    <Route path="/" component={App} />
  </ConnectedRouter>
);

class Index extends React.Component {
  render() {
    let component;
    if (__DEVTOOLS__) {
      const DevTools = require('./components/DevTools').default;

      component = (
        <div>
          <Provider store={store}>
            <div>
              {routes}
              <DevTools />
            </div>
          </Provider>
        </div>
      );
    } else {
      component = (
        <div>
          <Provider store={store}>{routes}</Provider>
        </div>
      );
    }

    return component;
  }
}

export default Index;
