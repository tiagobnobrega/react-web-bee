import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './modules/store';
import App from './components/App/App.js';
// import registerServiceWorker, { unregister } from './registerServiceWorker';

import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
// unregister();
// registerServiceWorker();
