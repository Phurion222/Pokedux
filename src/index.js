import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { pokeonsReducer } from './reducers/pokemons';
import { Provider } from'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from'redux';
import { featuring, logger } from './middlewares';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const composedEnhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger)); 

const store = createStore(pokeonsReducer, composedEnhancers);
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
