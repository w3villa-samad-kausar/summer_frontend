import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomScrollView from '../../components/authComponents/CustomScrollView'
import ImageUrl from '../../constants/ImageUrl'
import MyCarousel  from '../../components/profileComponents/Carousel'


const DashboardScreen = ({navigation}) => {
  return (


    <CustomScrollView contentContainerStyle={overRiddenStyle}>
      <View style={styles.header}>
        <Text style={styles.centerMesssageText} >Hello Samad</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('ProfileOptions')}>

        <Image
          source={ImageUrl.profileIcon}
          style={styles.profileImage}
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