import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserData } from '../../redux/reducers/UserSlice'

const width=Dimensions.get('window').width
const height=Dimensions.get('window').height
const CoverProfilePhoto = () => {
  const dispatch=useDispatch()
  const[profilePictureUrl,setProfilePictureUrl]=useState('')
  const fetchUserData = async () => {
    const action = await dispatch(getUserData());
    const fetchedUserData = action.payload[0];
    setProfilePictureUrl(fetchedUserData.profile_picture_url)
  }

  useEffect(() => {
    fetchUserData();
  })

  return (
    <>
    <View style={styles.container}>
       <ImageBackground 
        source={{uri:profilePictureUrl}}
        style={styles.image}
       />
    </View>
    </>
  )
}

export default CoverProfilePhoto

const styles = StyleSheet.create({
    
    image: {
        width:width,
        height:height,
        resizeMode:'cover',
        position:'absolute'

    }
})