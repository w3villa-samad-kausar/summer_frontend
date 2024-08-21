import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomScrollView from '../../components/authComponents/CustomScrollView'
import MyCarousel  from '../../components/profileComponents/Carousel'
import { Icon } from '@rneui/themed'
import API from '../../helpers/api/ApiHelper'
import { errorToastMessage } from '../../utility/ToastMessage'


const DashboardScreen = ({navigation}) => {
  const profileFetch=async()=>{
    
    try {
      
      const response = await API.get('/api/get-userdata')
      
      // console.log("no errr>>>",response[0].name)

      const data={
        name: response[0].name,
        email: response[0].email,
        mobileNumber: response[0].mobile_number,
        address: response[0].address,
        tier:response[0].plan
      }


      navigation.navigate('ProfileOptions',data)
      
      
    } catch (error) {
      
      errorToastMessage(error?.response?.data)
      // console.log("errr>>>",error?.response?.data)
    }
  }
  return (


    <CustomScrollView contentContainerStyle={overRiddenStyle}>
      <View style={styles.header}>
        <Text style={styles.centerMesssageText} >Hello Samad</Text>
        <TouchableOpacity onPress={profileFetch}>
        <Icon 
          type='antdesign'
          name='user'
          size={30}
        />
        </TouchableOpacity>
      </View>
      
      <MyCarousel />
    </CustomScrollView>

  )
}
const overRiddenStyle = {
  alignItems: undefined,
  paddingVertical: undefined,
  justifyContent: 'center',

}
const styles = StyleSheet.create({
  centerMesssage: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  centerMesssageText: {
    fontSize: 26,
    color: "black"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop:,
    padding: 20
    // gap:180
  },
  profileImage: {
    width: 50,
    height: 50,

  }

})

export default DashboardScreen