import React, { useEffect, useState } from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/ProfileStack'
import AdminStack from './src/navigations/AdminStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import { getAuthToken } from './src/utility/AuthToken'
import { jwtDecode } from 'jwt-decode'
import { Provider, useSelector } from 'react-redux'
import { store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import Router from './src/navigations/Router'
import Toast from 'react-native-toast-message'

const App = () => {

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  )
}

export default App
