import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import feed from './ducks/feed';
import posts from './ducks/posts';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  feed,
  posts,
});
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
