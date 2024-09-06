import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { useDispatch} from 'react-redux';
import { socialSignin } from '../../redux/reducers/AuthSlice';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next'

const Icons = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [userInfo, setUserInfo] = useState(null)

  const googleLoginHandler = () => {
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
            const action = await dispatch(socialSignin(data))

            // Handle successful response, like navigating to another screen
            if (action?.payload?.msg === 'User created , please verify mobile number') {
              navigation.navigate('MobileNumber', { email: data.email })
            }


          }
        }).catch((e) => {
          console.log("ERROR: " + JSON.stringify(e));
        })
      }
    }).catch((e) => {
      console.log("ERROR: " + JSON.stringify(e));
    })
  }

  const facebookLoginHandler = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        console.log('login', login)
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  const getInfoFromToken = async (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,email,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(user);
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }

  if (userInfo) {
    const data = {
      name: userInfo.name,
      email: userInfo.email,
    }
    const action = dispatch(socialSignin(data))
    if (action?.payload?.msg === 'User created , please verify mobile number') {
      navigation.navigate('MobileNumber', { email: data.email })
    }
    // else{
    //   console.log(action?.payload?.msg)
    // }
  }


  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconContainerButton} onPress={googleLoginHandler}>
            <Icon
              type='antdesign'
              name='google'
              size={30}
              color='red' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainerButton} onPress={facebookLoginHandler}>
        
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