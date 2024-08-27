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

const App = () => {

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  )
}

export default App
