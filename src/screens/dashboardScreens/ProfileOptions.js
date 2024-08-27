
import React from 'react'
import PageHeading from '../../components/profileComponents/PageHeading'

import NameAndPhoto from '../../components/profileComponents/NameAndPhoto'
import OptionNames from '../../components/profileComponents/OptionNames'
import { Alert, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import API from '../../helpers/api/ApiHelper'
import { deleteStoredToken, removeStoredToken } from '../../utility/AuthToken'
import { successToastMessage } from '../../utility/ToastMessage'
import { resetAuth } from '../../redux/reducers/AuthSlice'
import { useDispatch } from 'react-redux'

const ProfileOptions = ({ navigation }) => {
  const route = useRoute()
  const dispatch = useDispatch()
  // console.log(route.params)
  const name = route.params?.name
  const plan = route.params?.tier
  const email = route.params?.email
  const mobileNumber = route.params?.mobileNumber
  const address = route.params?.address
  const profilePicture = route.params?.profilePicture
  // console.log(profilePicture)

  const deletHandler=()=>{
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"), // Alert closes after this
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response= await API.delete('/api/delete',email)
              successToastMessage(response?.msg)
              console.log(response?.msg)
              deleteStoredToken()

              
            } catch (error) {
              console.log(error)
              
            }
          }, 
        },
      ],
      { cancelable: false }
    );
  }
  const logoutHandler=()=>{
    Alert.alert(
      "Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"), // Alert closes after this
          style: "cancel",
        },
        {
          text: "OK",
          onPress: clearToken
        },
      ],
      { cancelable: false }
    );
  }

  const clearToken = async () => {
    dispatch(resetAuth())
  }
  
  return (
    <>
      <ScrollView>

        <PageHeading
          pageName='Profile'
          onPressHandler={() => { navigation.navigate('Dashboard') }}>
        </PageHeading>

        <NameAndPhoto
          name={name}
          tierName={plan}
          profilePicture={profilePicture}
          navigation={navigation}>
        </NameAndPhoto>

        <OptionNames
          optionName="Edit Profile"
          onPresshandler={
            () => {
              navigation.navigate('EditProfile', {
                name,
                email,
                mobileNumber,
                address,
                plan,
                profilePicture,
              })
            }}>
        </OptionNames>

        <OptionNames
          optionName="Delete"
          hasMarginTop={true}
          hasColour={true}
          hasIcon={true}
          onPresshandler={deletHandler}
          >
        </OptionNames>

        <OptionNames
          optionName="Logout"
          hasMarginTop={true}
          hasColour={true}
          hasIcon={true}
          onPresshandler={logoutHandler}>
        </OptionNames>

      </ScrollView>
    </>
  )
}

export default ProfileOptions
