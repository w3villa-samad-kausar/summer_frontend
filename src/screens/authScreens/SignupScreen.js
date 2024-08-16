import React, { useState } from 'react'
import BackgroundImage from '../../components/authComponents/BackgroundImage'
import SubmitButton from '../../components/authComponents/SubmitButton'
import Icons from '../../components/authComponents/Icons'
import OrComponent from '../../components/authComponents/OrComponent'
import CustomStatusBar from '../../components/CustomStatusBar'
import SigninSignupToggler from '../../components/authComponents/SigninSignupToggler'
import axios from 'axios'
import { successToastMessage, errorToastMessage } from '../../utility/ToastMessage'
import * as Yup from 'yup'
import { Formik } from 'formik'
import FormInputField from '../../components/authComponents/FormInputField'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'

const height = Dimensions.get('screen').height
const SignupScreen = ({ navigation }) => {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be atleast 2 characters")
      .required('Name is required'),

    email: Yup.string()
      .email('Invalid Email')
      .required("Email is required"),

    mobileNumber: Yup.string()
      .min(10, 'Number must be at least 10 digits')
      .max(10, 'Number cannot exceed 10 digits')
      .required('Number is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const handleSignUp = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      mobileNumber: values.mobileNumber,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
    try {
      console.log("Starting request");
      const response = await axios.post('http://10.0.2.2:4000/api/register', data);
      console.log("Response received:", response);

      if (response) {
        console.log('Navigating to OTP Verification');
        successToastMessage(response?.data?.msg);
        navigation.navigate('OtpVerification', { mobileNumber: data.mobileNumber });
      }
    } catch (error) {
      console.error("Error caught:", error);
      errorToastMessage(error?.response?.data?.msg);
    }


  }

  return (
    <Formik
      initialValues={{ name: '', email: '', mobileNumber: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
        return (

          <>
            <BackgroundImage height='35%' />
            <CustomStatusBar />
            <ScrollView style={styles.container} >
              <FormInputField
                placeholderText="Enter name"
                hasMarginTop={true}
                keyboardType="default"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                touched={touched.name}
              />
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
                placeholderText="Enter mobile number"
                hasMarginTop={true}
                keyboardType="number"
                value={values.mobileNumber}
                onChangeText={handleChange('mobileNumber')}
                onBlur={handleBlur('mobileNumber')}
                error={errors.mobileNumber}
                touched={touched.mobileNumber}
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


              <FormInputField
                placeholderText="Re-enter password"
                hasMarginTop={true}
                isSecureText={true}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />


              <SubmitButton
                label="Sign Up"
                onPress={handleSubmit} />

              <SigninSignupToggler
                question="Already have an account?"
                button=" Sign In"
                onPress={() => { navigation.navigate('SignIn') }}
              />
              <OrComponent />
              <Icons />


            </ScrollView>
          </>
        )
      }}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    height:height/0.5,
    flexGrow:1,
    top:height/5,
    marginBottom: 200,
  }
})


export default SignupScreen
