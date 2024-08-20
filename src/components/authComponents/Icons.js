import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import ImageUrl from '../../constants/ImageUrl'
import { Icon } from '@rneui/themed'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';




const Icons = (navigation) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => {
        GoogleSignin.configure({
          androidClientId: '875917285754-1bl3bptndiqr25kkq1et2nnukhtevqi5.apps.googleusercontent.com',

        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
          if (hasPlayService) {
            GoogleSignin.signIn().then(async (userInfo) => {
              console.log(JSON.stringify(userInfo))
              if (userInfo) {
                const data = {
                  email: userInfo.user.email,
                  name: userInfo.user.name,
                }
                try {
                  const response = await axios.post('http://10.0.2.2:4000/api/login', data);

                  console.log(response.data);
                  // Handle successful response, like navigating to another screen
                  navigation.navigate('OtpVerification');
                } catch (error) {
                  console.error('Login failed:', error);
                  // Handle error, like showing an error message
                }
              }
              navigation.navigate("MobileNumber")
            }).catch((e) => {
              console.log("ERROR IS: " + JSON.stringify(e));
            })
          }
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
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