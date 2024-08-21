import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import FormInputField from '../../components/authComponents/FormInputField';
import BackgroundImage from '../../components/authComponents/BackgroundImage';
import SubmitButton from '../../components/authComponents/SubmitButton';
import SigninSignupToggler from '../../components/authComponents/SigninSignupToggler';
import OrComponent from '../../components/authComponents/OrComponent';
import Icons from '../../components/authComponents/Icons';
import CustomStatusBar from '../../components/CustomStatusBar';
import * as Yup from 'yup';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { setStoredToken } from '../../utility/AuthToken';
import API from '../../helpers/api/ApiHelper';
import { errorToastMessage, successToastMessage } from '../../utility/ToastMessage';

const height = Dimensions.get('screen').height

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),


  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


const SigninScreen = ({ navigation }) => {
  const handleSignIn = async (values) => {
    data = {
      email: values.email,
      password: values.password
    }
    try {
      const response = await API.post('/api/login', data);
      if(response?.token){
        await setStoredToken(response?.token)
      }
      successToastMessage(response?.msg)
      // Handle successful response, like navigating to another screen
      // navigation.navigate('OtpVerification');
    } catch (error) {
      // Handle error, like showing an error message
      errorToastMessage(error?.response?.data?.msg)
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}  // Pass the form values to your API here
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

        return (

          <>
            <BackgroundImage height='55%' />
            <CustomStatusBar />
            <ScrollView style={styles.container}>
              <FormInputField
                placeholderText="Enter email"
                hasMarginTop={true}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />

              <FormInputField
                placeholderText="Enter password"
                hasMarginTop={true}
                isSecureText={true}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />

              <SubmitButton label="Sign In" onPress={handleSubmit} />
              <SigninSignupToggler
                question="Do not have an account?"
                button=" Sign Up"
                onPress={() => { navigation.navigate('SignUp'); }}
              />
              <OrComponent />
              <Icons />

            </ScrollView>
          </>
        )
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    height:height/4,
    flexGrow:1,
    top: height /3,
    marginBottom: 100,

  }
})

export default SigninScreen;
