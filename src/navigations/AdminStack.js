import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminDashboardScreen from '../screens/adminScreens/AdminDashboardScreen'
import Toast from 'react-native-toast-message'

const AdminStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Dashboard'>
                <Stack.Screen 
                    name='Dashboard'
                    component={AdminDashboardScreen}
                    options={{ headerShown: false }} />

            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    )
}

export default AdminStack