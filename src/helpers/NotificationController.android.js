import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const NotificationController = () => {
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorize your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional)
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created
    );

    // // Listen for foreground messages
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   PushNotification.localNotification({
    //     channelId: "channel-id", // Use the same channel ID
    //     message: remoteMessage.notification.body,
    //     title: remoteMessage.notification.title,
    //     bigPictureUrl: remoteMessage.notification.android?.imageUrl, // Handle possible undefined values
    //     smallIcon: remoteMessage.notification.android?.imageUrl, // Handle possible undefined values
    //   });
    // });

    // return () => unsubscribe();
  }

export default NotificationController;
