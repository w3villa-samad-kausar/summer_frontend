import React from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/ProfileStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import ProfileCard from './src/components/profileComponents/ProfileCard'
import AskingMobileNumber from './src/screens/authScreens/AskingMobileNumber'
import OtpVerification from './src/screens/authScreens/OtpVerification'

const App = () => {
  return (
    
<GestureHandlerRootView>
<AuthStack />
      {/* <ProfileStack />  */}

      {/* <AskingMobileNumber /> */}

      
</GestureHandlerRootView>
  )
}

export default App