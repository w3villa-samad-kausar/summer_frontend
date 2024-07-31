import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomView from '../CustomView'

const PageHeading = ({ pageName,onPressHandler }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onPressHandler}>
      <Image
        source={require('/home/w3villa/react_native/Summer/assets/images/back_icon.jpg')}
        style={styles.backIcon}
      /></TouchableOpacity>
      <Text style={styles.text}>{pageName}</Text>
    </View>
  )
}

export default PageHeading


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap:10,
    marginTop: 10,
    marginLeft: 8
  } ,
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  backIcon: {
    width: 30,
    height: 30,

  }
})