import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../../app/component/App';
import { Provider } from 'react-redux';
import configureStore from '../../app/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('application')
);