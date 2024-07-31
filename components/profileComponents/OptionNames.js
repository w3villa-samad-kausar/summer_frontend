import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OptionNames = ({ optionName,hasMarginTop,onPresshandler }) => {
  return (
    <TouchableOpacity onPress={onPresshandler}>
    <View style={[styles.container,hasMarginTop &&styles.marginTop]}>
    
      <Text style={styles.text}>{optionName}</Text>
      <Image
        source={require('/home/w3villa/react_native/Summer/assets/images/front_icon.png')}
        style={styles.image}
      />
      
    </View>
    </TouchableOpacity>
  )
}

export default OptionNames

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 70,
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    marginLeft: 20
  },
  marginTop:{
    marginTop: 0,
    borderTopWidth:0
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    color: 'black'
  },
  image: {
    width: 30,
    height: 30,
  }
})