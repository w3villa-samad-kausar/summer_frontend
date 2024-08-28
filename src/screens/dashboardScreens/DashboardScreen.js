import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyCarousel from '../../components/profileComponents/Carousel'
import { Icon } from '@rneui/themed'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../redux/reducers/UserSlice'


const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(null)

  const profileFetch = async () => {
      const action = await dispatch(getUserData())
      setUserData(action.payload[0]) // Assuming action.payload contains the fetched user data
  }

  useEffect(() => {
    profileFetch()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.centerMesssageText} >Hello, {userData?.name || ''}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileOptions')}>
          <Icon
            type='antdesign'
            name='user'
            size={30}
          />
        </TouchableOpacity>
      </View>

      <MyCarousel />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    padding: 20
  },
  profileImage: {
    width: 50,
    height: 50,
  }
})

export default DashboardScreen
