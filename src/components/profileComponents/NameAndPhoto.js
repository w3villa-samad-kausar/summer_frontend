import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const NameAndPhoto = ({ name, tierName, profilePicture}) => {
  const navigation = useNavigation()

  const handleNavigation = async () => {
    navigation.navigate('ProfileScreen')
  }

  return (
    <View style={styles.container}>
        <>
          {profilePicture && <ProfilePhoto profilePicture={profilePicture} />}
          <View style={styles.nameContainer}>
            <TouchableOpacity onPress={handleNavigation}>
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
            <Text style={styles.tier}>{tierName} user</Text>
          </View>
        </>
    </View>
  )
}

export default NameAndPhoto

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nameContainer: {
    flex: 0.8,
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tier: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
})
