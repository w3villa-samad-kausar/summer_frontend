import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomView from '../CustomView'
import ImageUrl from '../../constants/ImageUrl'

const PageHeading = ({ pageName,onPressHandler }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onPressHandler}>
      <Image
        source={ImageUrl.leftArrowIcon}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  backIcon: {
    width: 30,
    height: 30,

  }
})