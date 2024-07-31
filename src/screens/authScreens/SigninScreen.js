import React, { useState } from 'react'
import BackgroundImage from '../../components/authComponents/BackgroundImage'
import SigninSignupButtons from '../../components/authComponents/SigninSignupButtons'
import InputComponents from '../../components/authComponents/InputComponents'
import SubmitButton from '../../components/authComponents/SubmitButton'
import Icons from '../../components/authComponents/Icons'
import CustomScrollView from '../../components/authComponents/CustomScrollView'
import MainElementIsland from '../../components/authComponents/MainElementIsland'
import OrComponent from '../../components/authComponents/OrComponent'
import CustomStatusBar from '../../components/CustomStatusBar'
import SigninSignupToggler from '../../components/authComponents/SigninSignupToggler'

const SigninScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log(email, password);
    navigation.navigate('OtpVerification')

  }
  return (
    <>
      <BackgroundImage height='55%' />
      <CustomStatusBar />
      <CustomScrollView>
        <MainElementIsland screenType="signin" marginTop={150} height={470} >
          <SigninSignupButtons
            activeButton='signin'
          />

          <InputComponents
          hasMarginTop={false} 
          label='Enter email'
          value={email}
          onChangeText={setEmail} />
          
          <InputComponents 
          hasMarginTop={true} 
          label='Enter password' 
          isSecureText={true}
          value={password}
          onChangeText={setPassword} />

          <SubmitButton
            label="Sign In"
            onPress={handleSignIn} />
          <SigninSignupToggler
            question="Do not have an account?"
            button=" Sign Up"
            onPress={()=>{navigation.navigate('SignUp')}}
          />
          <OrComponent />
          <Icons />
        </MainElementIsland>
      </CustomScrollView>
    </>



  )
}
export default SigninScreen