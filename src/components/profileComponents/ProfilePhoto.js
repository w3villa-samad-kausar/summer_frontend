import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageUrl from '../../constants/ImageUrl'

const ProfilePhoto = () => {
  return (
    <Image
      source={ImageUrl.profilePhoto}
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