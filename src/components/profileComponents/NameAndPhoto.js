import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'

const NameAndPhoto = ({ name, tierName }) => {
  return (
    <View style={styles.container}>
      <ProfilePhoto></ProfilePhoto>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tier}>{tierName}</Text>
        <Text>  </Text>
      </View>
    </View>
  )
}

export default NameAndPhoto

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginVertical:10,
    // gap:40
  },
  nameContainer: {
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    paddingLeft:20
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    // paddingLeft:10
    // marginLeft:20,
  },
  tier: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    // marginTop:40
  }
})