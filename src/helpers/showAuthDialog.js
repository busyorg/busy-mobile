import { Alert } from 'react-native';

export default function showAuthDialog() {
  Alert.alert(
    'Login required',
    'You have to be logged in to do this.',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}
