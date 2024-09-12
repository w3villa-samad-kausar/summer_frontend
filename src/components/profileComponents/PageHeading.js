import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'

const PageHeading = ({ pageName,onPressHandler }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onPressHandler}>
      <Icon
      type='antdesign'
      name='arrowleft'
      size={20}
      color='black' />

      </TouchableOpacity>
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
  }
})