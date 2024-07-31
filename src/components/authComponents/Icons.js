import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import ImageUrl from '../../constants/ImageUrl'

const Icons = () => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={ImageUrl.facebookIcon}
        style={[styles.icon, { width: 30 }, { height: 30 }]}
      />
      <Image
        source={ImageUrl.googleIcon}
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