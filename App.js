import React, { useEffect, useState } from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/ProfileStack'
import AdminStack from './src/navigations/AdminStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import { getAuthToken } from './src/utility/AuthToken'
import {jwtDecode} from 'jwt-decode'

const App = () => {
  const [role, setRole] = useState(null); // State to store the role

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAuthToken()
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.role); // Set the role from the decoded token
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
    fetchToken()
  }, []); // Empty dependency array to run only once on mount

  return (
    <GestureHandlerRootView>
      {role === 'ADMIN' ? (
        <AdminStack />
      ) : role ? (
        <ProfileStack />
      ) : (
        <AuthStack />
      )}
    </GestureHandlerRootView>
  )
}

export default App
