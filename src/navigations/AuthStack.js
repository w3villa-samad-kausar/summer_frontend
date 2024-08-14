import React from 'react'


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message';
import SigninScreen from '../screens/authScreens/SigninScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import OtpVerification from '../screens/authScreens/OtpVerification';
import AskingMobileNumber from '../screens/authScreens/AskingMobileNumber';
const AuthStack=()=>{
    const Stack = createNativeStackNavigator()
    return (

    <NavigationContainer>
        <Stack.Navigator initialRouteName='SignUp'>
            <Stack.Screen
                name="SignIn"
                component={SigninScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="SignUp"
                component={SignupScreen}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="OtpVerification"
                component={OtpVerification}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="MobileNumber"
                component={AskingMobileNumber}
                options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast />
    </NavigationContainer>
)
}

export default  AuthStack