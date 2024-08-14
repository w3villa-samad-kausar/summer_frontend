
import React from 'react'
import PageHeading from '../../components/profileComponents/PageHeading'

import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import OptionNames from '../../components/profileComponents/OptionNames'
import { ScrollView } from 'react-native'

const ProfileOptions = ({navigation}) => {
  return (
    <>
      <ScrollView>

        <PageHeading pageName='Profile' onPressHandler={()=>{navigation.navigate('Dashboard')}}></PageHeading>
        <NameAndPhoto name="Samad Kausar" tierName='Basic User' navigation={navigation}></NameAndPhoto>
        <OptionNames optionName="Edit Profile" onPresshandler={()=>{navigation.navigate('EditProfile')}}></OptionNames>
        <OptionNames optionName="Settings" hasMarginTop={true}></OptionNames>
        <OptionNames optionName="Logout" hasMarginTop={true} hasColour={true} hasIcon={true}></OptionNames>
      
      </ScrollView>
    </>
  )
}

export default ProfileOptions
