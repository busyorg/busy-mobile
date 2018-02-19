import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen';
import UserScreen from '../screens/UserScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Post: {
      screen: PostScreen,
    },
    User: {
      screen: UserScreen,
    }
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#4757b2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);

export default RootStackNavigator;
