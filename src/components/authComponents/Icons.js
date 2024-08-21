import React from 'react'
import {  StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import API from '../../helpers/api/ApiHelper';
import { successToastMessage } from '../../utility/ToastMessage';
import { useNavigation } from '@react-navigation/native';




const Icons = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => {
        GoogleSignin.configure({
          androidClientId: Config.ANDROID_CLIENT_ID,

        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
          if (hasPlayService) {
            GoogleSignin.signIn().then(async (userInfo) => {
              if (userInfo) {
                const data = {
                  email: userInfo.user.email,
                  name: userInfo.user.name,
                }
                try {
                  const response = await API.post('/api/social-login', data);
                  successToastMessage(response?.msg)
                  if(response?.msg==='User created , please verify mobile number'){
                    navigation.navigate('MobileNumber',{email:data.email})
                  }
                  
                  // Handle successful response, like navigating to another screen
                } catch (error) {
                  console.error('Login failed:', error);
                  // Handle error, like showing an error message
                }
              }
            }).catch((e) => {
              console.log("ERROR IS123: " + JSON.stringify(e));
            })
          }
        }).catch((e) => {
          console.log("ERROR IS567: " + JSON.stringify(e));
        })
      }}>

        <Icon
          type='antdesign'
          name='google'
          size={30}
          color='red' />
      </TouchableOpacity>
      <TouchableOpacity>

        <Icon
          type='antdesign'
          name='facebook-square'
          size={30}
          color='blue' />

      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

  iconContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },
})

export default Icons