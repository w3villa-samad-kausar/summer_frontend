import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification'

export const getFcmToken = async () => {
    try {
        const newFcmToken = await messaging().getToken();
        return newFcmToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const notificationListener = () => {
    messaging().onMessage(remoteMessage => {
        console.log('Foreground message:', remoteMessage);
        PushNotification.localNotification({
            channelId: "channel-id", // Use the same channel ID
            message: remoteMessage.notification.body,
            title: remoteMessage.notification.title,
            bigPictureUrl: remoteMessage.notification.android?.imageUrl, // Handle possible undefined values
            smallIcon: remoteMessage.notification.android?.imageUrl, // Handle possible undefined values
        });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('App opened by notification while in foreground:', remoteMessage);
        // Handle notification interaction when the app is in the foreground
    });
    messaging().getInitialNotification().then(remoteMessage => {
        console.log('App opened by notification from closed state:', remoteMessage);
        // Handle notification interaction when the app is opened from a closed state
    });
}