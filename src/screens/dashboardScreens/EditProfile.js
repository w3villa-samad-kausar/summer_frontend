import { ScrollView } from 'react-native'
import React from 'react'
import PageHeading from '../../components/profileComponents/PageHeading'
import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import InputFields from '../../components/profileComponents/InputFields'

const EditProfile = ({navigation}) => {
  return (
    <ScrollView>
      <PageHeading pageName='Edit Profile' onPressHandler={()=>{navigation.navigate("ProfileOptions")}}></PageHeading>
      <NameAndPhoto name='Samad Kausar' tierName='Basic User' navigation={navigation}></NameAndPhoto>
      <InputFields label='First name' value='samad' firstElement={true}/>
      <InputFields label='Last name' value='kausar'/>
      <InputFields label='Email' value='samad@gmail.com'/>
      <InputFields label='Phone number' value='01700000000'/>
      <InputFields label='Address' value='Dhaka, Bangladesh'/>
      <InputFields label='City' value='Dhaka'/>
      <InputFields label='Country' value='Bangladesh'/>
      <InputFields label='Zip code' value='1200'/>
      
    </ScrollView>
  )
}

export default EditProfile