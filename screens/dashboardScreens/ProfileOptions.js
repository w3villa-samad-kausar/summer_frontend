
import React from 'react'
import CustomView from '../../components/CustomView'
import PageHeading from '../../components/profileComponents/PageHeading'

import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import OptionNames from '../../components/profileComponents/OptionNames'

const ProfileOptions = ({navigation}) => {
  return (
    <>
      <CustomView >
        <PageHeading pageName='Profile' onPressHandler={()=>{navigation.navigate('Dashboard')}}></PageHeading>
        <NameAndPhoto name="Samad Kausar" tierName='Basic User'></NameAndPhoto>
        <OptionNames optionName="Edit Profile" onPresshandler={()=>{navigation.navigate('EditProfile')}}></OptionNames>
        <OptionNames optionName="Payment History" hasMarginTop={true}></OptionNames>
        <OptionNames optionName="Privacy Policy" hasMarginTop={true}></OptionNames>
        <OptionNames optionName="Logout" hasMarginTop={true} ></OptionNames>
      </CustomView>
    </>
  )
}

export default ProfileOptions
