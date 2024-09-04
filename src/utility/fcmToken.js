import messaging from "@react-native-firebase/messaging";

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
        // Display the notification to the user
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