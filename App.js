import React from 'react'
import SignupScreen from './screens/authScreens/SignupScreen'
import OtpVerification from './screens/authScreens/OtpVerification'
import SigninScreen from './screens/authScreens/SigninScreen'


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from './screens/dashboardScreens/DashboardScreen'
import ProfileOptions from './screens/dashboardScreens/ProfileOptions'
import EditProfile from './screens/dashboardScreens/EditProfile'

const Stack=createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen 
      name="SignIn" 
      component={SigninScreen}
      options={{headerShown:false}} />
      <Stack.Screen 
      name="SignUp"
      component={SignupScreen}
      options={{headerShown:false}} />
      <Stack.Screen 
      name="OtpVerification"
      component={OtpVerification}
      options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Dashboard'>
    //     <Stack.Screen
    //     name="Dashboard"
    //     component={DashboardScreen}
    //     options={{headerShown:false}} />
    //     <Stack.Screen
    //     name="ProfileOptions"
    //     component={ProfileOptions}
    //     options={{headerShown:false}} />
    //     <Stack.Screen
    //     name="EditProfile"
    //     component={EditProfile}
    //     options={{headerShown:false}} />
    //   </Stack.Navigator>
    // </NavigationContainer>
     
  )
}

export default App