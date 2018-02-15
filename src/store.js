import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { GET_FEED, GET_MORE_FEED } from './feed/feedActions';

const initialState = {
  loading: false,
  posts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED.START:
    case GET_MORE_FEED.START:
      return {
        ...state,
        loading: true,
      };
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
      };
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
