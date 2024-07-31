import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomScrollView from '../../components/authComponents/CustomScrollView'


const DashboardScreen = ({navigation}) => {
  return (


    <CustomScrollView contentContainerStyle={overRiddenStyle}>
      <View style={styles.header}>
        <Text style={styles.centerMesssageText} >Hello Samad</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('ProfileOptions')}>

        <Image
          source={require('/home/w3villa/react_native/Summer/assets/images/profile_icon.jpg')}
          style={styles.profileImage}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.centerMesssage}>
        <Text style={styles.centerMesssageText}>Welcome to Dashboard</Text>
      </View>
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