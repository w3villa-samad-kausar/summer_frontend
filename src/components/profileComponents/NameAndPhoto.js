import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { TouchableOpacity } from 'react-native'
import API from '../../helpers/api/ApiHelper'
import { errorToastMessage } from '../../utility/ToastMessage'

const NameAndPhoto = ({ name, tierName, navigation }) => {
  const handlenavigation = async () => {
    try {

      const response = await API.get('/api/get-userdata')

      
      const data={
        name: response[0].name,
        email: response[0].email,
        mobileNumber: response[0].mobile_number,
        address: response[0].address
      }
      
      // console.log("no errr>>>",data)

      navigation.navigate('ProfileScreen',data)


    } catch (error) {

      errorToastMessage(error?.response?.data)
      // console.log("errr>>>",error?.response?.data)
    }
  }
  return (
    <View style={styles.container}>
      <ProfilePhoto></ProfilePhoto>
      <View style={styles.nameContainer}>
        <TouchableOpacity onPress={handlenavigation}>
          <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
        <Text style={styles.tier}>{tierName} user</Text>

      </View>
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

    // marginVertical:10,
    // gap:40
  },
  nameContainer: {
    flex: 0.8,
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    // paddingLeft:20,
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 30
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