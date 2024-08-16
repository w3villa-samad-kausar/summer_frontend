import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../../components/CustomStatusBar'
import CoverProfilePhoto from '../../components/profileComponents/CoverProfilePhoto'
import ProfileCard from '../../components/profileComponents/ProfileCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserProfileScreen = () => {
  return (
    <>
        
        <CoverProfilePhoto />
        <ProfileCard />
    </>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({})