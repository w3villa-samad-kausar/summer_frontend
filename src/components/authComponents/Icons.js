import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import ImageUrl from '../../constants/ImageUrl'
import { Icon } from '@rneui/themed'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';




const Icons = () => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => {
            GoogleSignin.configure({
              androidClientId: '875917285754-1bl3bptndiqr25kkq1et2nnukhtevqi5.apps.googleusercontent.com',
              
            });
            GoogleSignin.hasPlayServices().then((hasPlayService) => {
              if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                  console.log(JSON.stringify(userInfo))
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