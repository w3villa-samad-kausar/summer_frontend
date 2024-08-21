
import React from 'react'
import PageHeading from '../../components/profileComponents/PageHeading'

import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import OptionNames from '../../components/profileComponents/OptionNames'
import { ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'

const ProfileOptions = ({navigation}) => {
  const route=useRoute()
  // console.log(route.params)
  const name=route.params?.name
  const plan=route.params?.tier
  const email=route.params?.email
  const mobileNumber=route.params?.mobileNumber
  const address=route.params?.address
  return (
    <>
      <ScrollView>

        <PageHeading pageName='Profile' onPressHandler={()=>{navigation.navigate('Dashboard')}}></PageHeading>
        <NameAndPhoto name={name} tierName={plan} navigation={navigation}></NameAndPhoto>
        <OptionNames optionName="Edit Profile" onPresshandler={()=>{navigation.navigate('EditProfile',{name,email,mobileNumber,address,plan})}}></OptionNames>
        <OptionNames optionName="Settings" hasMarginTop={true}></OptionNames>
        <OptionNames optionName="Logout" hasMarginTop={true} hasColour={true} hasIcon={true}></OptionNames>
      
      </ScrollView>
    </>
  )
}

export default ProfileOptions
