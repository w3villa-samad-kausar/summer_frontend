import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Icons = () => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={require('/home/w3villa/react_native/Summer/assets/images/facebook.png')}
        style={[styles.icon, { width: 30 }, { height: 30 }]}
      />
      <Image
        source={require('/home/w3villa/react_native/Summer/assets/images/Google_Icons-09-512.webp')}
        style={[styles.icon, { marginTop: -2 }]}
      />
    </View>
  )
}
const styles=StyleSheet.create({

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  }
})

export default Icons