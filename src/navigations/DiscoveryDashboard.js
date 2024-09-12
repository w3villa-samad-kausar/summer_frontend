import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/dashboardScreens/DashboardScreen'
import ProfileOptions from '../screens/dashboardScreens/ProfileOptions'
import EditProfile from '../screens/dashboardScreens/EditProfile'
import UserProfileScreen from '../screens/dashboardScreens/UserProfileScreen'

const DiscoveryDashboard = () => {
    const Stack = createNativeStackNavigator()
    return (
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
    )
}

export default DiscoveryDashboard