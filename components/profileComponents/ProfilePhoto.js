import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfilePhoto = () => {
  return (
    <Image
      source={require('/home/w3villa/react_native/Summer/assets/images/profile.jpg')}
      style={styles.imageStyling}
    />
  )
}

export default ProfilePhoto

const styles = StyleSheet.create({
  imageStyling: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    // marginLeft: 20,
  }
})