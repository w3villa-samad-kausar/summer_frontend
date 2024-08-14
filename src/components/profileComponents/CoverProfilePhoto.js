import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height
const CoverProfilePhoto = () => {
  return (
    <>
    <View style={styles.container}>
       <ImageBackground 
        source={require('../../assets/images/profile.jpg')}
        style={styles.image}
       />
    </View>
    </>
  )
}

export default CoverProfilePhoto

const styles = StyleSheet.create({
    
    image: {
        width:width,
        height:height,
        resizeMode:'cover',
        position:'absolute'

    }
})