import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { TouchableOpacity } from 'react-native'

const NameAndPhoto = ({ name, tierName,navigation}) => {
  const handlenavigation=()=>{navigation.navigate('ProfileScreen')}
  return (
    <View style={styles.container}>
      <ProfilePhoto></ProfilePhoto>
      <View style={styles.nameContainer}>
      <TouchableOpacity onPress={handlenavigation}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
        <Text style={styles.tier}>{tierName}</Text>
        <Text>  </Text>
      </View>
    </View>
  )
}

export default NameAndPhoto

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginVertical:10,
    // gap:40
  },
  nameContainer: {
    flex:0.8,
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    paddingLeft:20,
    marginTop:20
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    // paddingLeft:10
    // marginLeft:20,
  },
  tier: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    // marginTop:40
  }
})