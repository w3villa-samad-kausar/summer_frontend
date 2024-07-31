import React from 'react'
import SignupScreen from './src/screens/authScreens/SignupScreen'
import OtpVerification from './src/screens/authScreens/OtpVerification'
import SigninScreen from './src/screens/authScreens/SigninScreen'


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from './src/screens/dashboardScreens/DashboardScreen'
import ProfileOptions from './src/screens/dashboardScreens/ProfileOptions'
import EditProfile from './src/screens/dashboardScreens/EditProfile'

const Stack=createNativeStackNavigator()

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='SignIn'>
    //   <Stack.Screen 
    //   name="SignIn" 
    //   component={SigninScreen}
    //   options={{headerShown:false}} />
    //   <Stack.Screen 
    //   name="SignUp"
    //   component={SignupScreen}
    //   options={{headerShown:false}} />
    //   <Stack.Screen 
    //   name="OtpVerification"
    //   component={OtpVerification}
    //   options={{headerShown:false}} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerShown:false}} />
        <Stack.Screen
        name="ProfileOptions"
        component={ProfileOptions}
        options={{headerShown:false}} />
        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
     
  )
}

export default App