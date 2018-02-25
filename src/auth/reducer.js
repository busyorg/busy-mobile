import { combineReducers } from 'redux';
import { LOGIN, LOGOUT } from './actions';

function loading(state = false, action) {
  switch (action.type) {
    case LOGIN.REQUEST:
      return true;
    case LOGIN.SUCCESS:
      return false;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

const auth = combineReducers({
  loading,
  user,
});

export default auth;

export const getIsAuthLoading = state => state.loading;
export const getAuthUser = state => state.user;
