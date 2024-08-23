import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminDashboardScreen from '../screens/adminScreens/AdminDashboardScreen'

const AdminStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        
            <Stack.Navigator initialRouteName='Dashboard'>
                <Stack.Screen 
                    name='Dashboard'
                    component={AdminDashboardScreen}
                    options={{ headerShown: false }} />

            </Stack.Navigator>
            
    )
}

export default AdminStack