/* eslint-disable no-underscore-dangle */
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { history } from './history';
import { FAIL, START, SUCCESS } from './shared/utils/constants';

import game, { moduleName as gameModuleName } from './components/PlayingField/redux/game.redux';


const rootReducer = combineReducers({
  // ...exampleStore,

  [gameModuleName]: game,
  routing: routerReducer,
});

// const logger = store => next => (action) => {
//   console.log('');
//   console.log('PREV STATE: ', store.getState());
//   console.log('ACTION: ', action.type);
//   next(action);
//   console.log('NEXT STATE', store.getState());
//   console.log('');
//   return next;
// };

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    promiseMiddleware({
      promiseTypeSuffixes: [
        START.replace('_', ''),
        SUCCESS.replace('_', ''),
        FAIL.replace('_', ''),
      ],
    }),
    thunk,
    // logger,
  ),
  // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer);

export default store;
