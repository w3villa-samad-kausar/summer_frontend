import React, { useEffect, useState } from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/ProfileStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import ProfileCard from './src/components/profileComponents/ProfileCard'
import AskingMobileNumber from './src/screens/authScreens/AskingMobileNumber'
import OtpVerification from './src/screens/authScreens/OtpVerification'
import { getAuthToken } from './src/utility/AuthToken'

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAuthToken()
      console.log("TTT", token)
      if(token){
        setToken(token)
      }
    }
    fetchToken()
  }, [token])

  return (
    <GestureHandlerRootView>
      {
        token ? (
          <ProfileStack />
        ) : (
          <AuthStack />
        )
      }

      {/* <AskingMobileNumber /> */}


    </GestureHandlerRootView>
  )
}

export default App