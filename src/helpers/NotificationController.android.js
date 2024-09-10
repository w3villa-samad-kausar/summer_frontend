import PushNotification from 'react-native-push-notification';

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
  }

export default NotificationController;
