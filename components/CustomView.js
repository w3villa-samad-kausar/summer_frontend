import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomView = ({children, customContainerStyle}) => {
  return (
    <View style={[styles.container,customContainerStyle]}>
      {children}
    </View>
  )
}

export default CustomView

const styles = StyleSheet.create({
  container:{
    // flex:1,
    // justifyContent:'center',
    // alignItems:"center"
  }
})