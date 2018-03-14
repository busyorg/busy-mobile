import { SecureStore } from 'expo';
import { loginSuccess } from './actions';
import sc2 from '../services/sc2';

const initialize = store =>
  new Promise(async resolve => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken === null || accessToken === undefined) return resolve();

    sc2.setAccessToken(accessToken);
    try {
      const result = await sc2.me();
      store.dispatch(loginSuccess(result.account));
    } catch (err) {
      console.log('login failed');
    }
    return resolve();
  });

export default initialize;
