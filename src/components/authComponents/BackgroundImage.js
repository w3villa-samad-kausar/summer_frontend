
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import ImageUrl from '../../constants/ImageUrl'

const BackgroundImage = ({height}) => {
  return (
    <ImageBackground
      source={ImageUrl.loginBg}
      style={[styles.backgroundImage,{height:height}]}
      imageStyle={styles.imageStyle}
    >
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  imageStyle: {
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
})

export default BackgroundImage
