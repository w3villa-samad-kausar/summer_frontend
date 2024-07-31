// MainElementIsland.js
import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import colors from '../../assets/colors'

const MainElementIsland = ({ children,marginTop,height,screenType }) => {
  return (
    <View style={[
      styles.mainElementIsland, 
      screenType === "signin" && { marginTop: marginTop, height: height },
      screenType === "signup" && { marginTop: marginTop, height: height }
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  mainElementIsland: {
    marginTop: 100,
    width: 340,
    height: 590,
    backgroundColor: colors.primaryBackground,
    opacity: 0.8,
    borderRadius: 10,
    elevation: 10,
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.2)' : 'transparent',
    marginBottom: 30,
  },
})

export default MainElementIsland
