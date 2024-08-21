import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import PageHeading from '../../components/profileComponents/PageHeading'
import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import InputFields from '../../components/profileComponents/InputFields'
import { useRoute } from '@react-navigation/native'

const EditProfile = ({navigation}) => {
  const route=useRoute()
  const [name,setName]=useState(route.params?.name)
  const [email,setEmail]=useState(route.params?.email)
  const [phone,setPhone]=useState(route.params?.mobileNumber)
  const [address,setAddress]=useState(route.params?.address)
  const tier=route.params?.plan
  return (
    <ScrollView>
      <PageHeading pageName='Edit Profile' onPressHandler={()=>{navigation.navigate("ProfileOptions")}}></PageHeading>
      <NameAndPhoto name={name} tierName={tier} navigation={navigation}></NameAndPhoto>
      <InputFields label='Name' value={name} firstElement={true}/>
      <InputFields label='Email' value={email}/>
      <InputFields label='Phone number' value={phone}/>
      <InputFields label='Address' value={address}/>
      
    </ScrollView>
  )
}

export default EditProfile