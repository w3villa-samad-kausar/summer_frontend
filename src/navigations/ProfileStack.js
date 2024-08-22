import React from 'react'
import DashboardScreen from '../screens/dashboardScreens/DashboardScreen'
import ProfileOptions from '../screens/dashboardScreens/ProfileOptions'
import EditProfile from '../screens/dashboardScreens/EditProfile'
import UserProfileScreen from '../screens/dashboardScreens/UserProfileScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const ProfileStack = () => {
  const Stack = createNativeStackNavigator()
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="ProfileOptions"
          component={ProfileOptions}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='ProfileScreen'
          component={UserProfileScreen}
          options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>

  )
}

export default ProfileStack