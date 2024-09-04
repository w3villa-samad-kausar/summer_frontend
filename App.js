import React, { useEffect, useState } from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/DashboardStack'
import AdminStack from './src/navigations/AdminStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import { getAuthToken } from './src/utility/AuthToken'
import { jwtDecode } from 'jwt-decode'
import { Provider, useSelector } from 'react-redux'
import { persistor, store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/navigations/Router'
import Toast from 'react-native-toast-message'
import { PersistGate } from 'redux-persist/integration/react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getFcmToken, notificationListener } from './src/utility/fcmToken'
import NotificationController from './src/helpers/NotificationController.android'

const App = () => {

  useEffect(() => {
    async function requestNotificationPermission() {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const token = await getFcmToken()
            console.log("Notificationtoken", token)
            notificationListener()
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
    requestNotificationPermission();
    notificationListener();
  }, [])


  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Router />
            <NotificationController />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  )
}

export default App
