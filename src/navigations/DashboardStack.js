import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import DiscoveryDashboard from './DiscoveryDashboard'
import AdminDashboardScreen from '../screens/adminScreens/AdminDashboardScreen'

const DashboardStack = () => {
  const Stack = createNativeStackNavigator()
  const loginUser = useSelector(state => state.auth.isLoggedIn)
  return (

    <Stack.Navigator initialRouteName='DiscoveryDashboard'>
      {
        loginUser?.role === 'ADMIN' ? (
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ headerShown: false }} />
        ) : (
          <Stack.Screen
            name="DiscoveryDashboard"
            component={DiscoveryDashboard}
            options={{ headerShown: false }} />
          
        )
      }
    </Stack.Navigator>

  )
}

export default DashboardStack