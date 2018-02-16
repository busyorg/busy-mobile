import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Post: {
      screen: PostScreen,
    },
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
