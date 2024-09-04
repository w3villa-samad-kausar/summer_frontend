import { PermissionsAndroid, Platform, Alert } from 'react-native';

export async function requestNotificationPermission(onPermissionGranted) {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (onPermissionGranted) {
          onPermissionGranted();
        }
        return true;
      } else {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in the app settings.'
        );
      }
    }
  } catch (err) {
    console.warn(err);
  }
}
