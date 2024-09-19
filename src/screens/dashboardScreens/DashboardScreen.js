import { URL, URLSearchParams } from 'react-native-url-polyfill';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from '@rneui/themed';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyCarousel from '../../components/profileComponents/Carousel';
import { getUserData, storeFcmToken } from '../../redux/reducers/UserSlice';
import API from '../../helpers/api/ApiHelper';
import { requestNotificationPermission } from '../../utility/NotificationPermission';
import { getFcmToken } from '../../utility/fcmToken';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [nextAction, setNextAction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const profileFetch = async () => {
    try {
      const action = await dispatch(getUserData());
      setUserData(action.payload[0]);
      setNextAction(action.payload[0].next_action);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePermissionGranted = async () => {
    try {
      const token = await getFcmToken();
      const data = {
        email: userData?.email,
        token,
      };
      await dispatch(storeFcmToken(data));
    } catch (error) {
      console.error('Error saving device token:', error);
    }
  };

  useEffect(() => {
    profileFetch();
    requestNotificationPermission(handlePermissionGranted);
  }, []);

  useEffect(() => {
    if (nextAction === 'Email Verification') {
      setModalVisible(true);
    }

    // Handle deep links in useEffect
    const handleDeepLink = (event) => {
      const url = event.url; // event.url is already a string
      if (url.includes('verify-email')) {
        const urlObject = new URL(url); // Create a URL object
        const urlParams = new URLSearchParams(urlObject.search); // Use .search to get query parameters
        const email = urlParams.get('email');
    
        // Navigate to the EmailVerifiedScreen with token and email
        navigation.navigate('EmailVerifiedScreen', { email });
      }
    };
    

    // Add the listener for incoming links
    const linkingSubscription = Linking.addListener('url', handleDeepLink);

    // Check if the app was opened from a link when initially launched
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Cleanup the event listener on unmount
    return () => {
      linkingSubscription.remove();
    };
  }, [nextAction, navigation]);

  const handleSendVerification = async () => {
    const data = { email: userData.email };
    try {
      const response = await API.post('/api/resend-email-verification', data);
      if (response) {
        alert('Verification email sent successfully!');
      }
    } catch (error) {
      console.error('Error sending verification email:', error?.response);
      alert('Failed to send verification email. Please try again later.');
    }
    setModalVisible(false);
  };

  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleNavigation = async () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between" alignItems="center" padding={20}>
            <SkeletonPlaceholder.Item width={150} height={30} borderRadius={4} />
            <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={20}>
            <SkeletonPlaceholder.Item width="90%" height={200} borderRadius={10} marginLeft={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigation}>
              <Text style={styles.centerMessageText}>Hello, {capitalizeName(userData?.name) || ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileOptions')}>
              <Icon type="antdesign" name="user" size={30} />
            </TouchableOpacity>
          </View>
          <MyCarousel />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Email Verification Required</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonSend]}
              onPress={handleSendVerification}
            >
              <Text style={styles.textStyle}>Send Verification Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonLater]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  centerMessageText: {
    fontSize: 26,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    height: 300,
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSend: {
    backgroundColor: '#2196F3',
    height: 80,
    width: 170,
  },
  buttonLater: {
    backgroundColor: '#f44336',
    height: 50,
    width: 170,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
});

export default DashboardScreen;
