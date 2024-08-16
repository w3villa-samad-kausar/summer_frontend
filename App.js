import React from 'react'
import AuthStack from './src/navigations/AuthStack'
import ProfileStack from './src/navigations/ProfileStack'
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler'
import ProfileCard from './src/components/profileComponents/ProfileCard'

const App = () => {
  return (
    
<GestureHandlerRootView>
<AuthStack />
      {/* <ProfileStack />  */}
</GestureHandlerRootView>
  )
}

export default App