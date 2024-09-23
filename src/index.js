import React from 'react';
import ReactDOM from 'react-dom/client';
import { pokemonsReducer } from './reducers/pokemons';
import { Provider } from'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from'redux';
import { logger } from './middlewares';
import { thunk } from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(applyMiddleware(thunk, logger)); 

const store = createStore(pokemonsReducer, composedEnhancers);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
