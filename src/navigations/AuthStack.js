import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SigninScreen from '../screens/authScreens/SigninScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import OtpVerification from '../screens/authScreens/OtpVerification';
import AskingMobileNumber from '../screens/authScreens/AskingMobileNumber';
const AuthStack = () => {
    const Stack = createNativeStackNavigator()
    return (

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
    )
}

export default AuthStack