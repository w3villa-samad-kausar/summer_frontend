import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../../components/CustomStatusBar'
import CoverProfilePhoto from '../../components/profileComponents/CoverProfilePhoto'
import ProfileCard from '../../components/profileComponents/ProfileCard'

const UserProfileScreen = () => {
  return (
    <>
        
        <CoverProfilePhoto />
        <ProfileCard />
        <ProfileCard />
    </>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({})