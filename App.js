import React, { useEffect } from 'react'
import {  GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider} from 'react-redux'
import { persistor, store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/navigations/Router'
import Toast from 'react-native-toast-message'
import { PersistGate } from 'redux-persist/integration/react';
import { notificationListener } from './src/utility/fcmToken'
import NotificationController from './src/helpers/NotificationController.android'
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => { 
    SplashScreen.hide();
    NotificationController()
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
