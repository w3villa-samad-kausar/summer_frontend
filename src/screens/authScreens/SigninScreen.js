import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import FormInputField from '../../components/authComponents/FormInputField';
import BackgroundImage from '../../components/authComponents/BackgroundImage';
import CustomScrollView from '../../components/authComponents/CustomScrollView';
import MainElementIsland from '../../components/authComponents/MainElementIsland';
import SigninSignupButtons from '../../components/authComponents/SigninSignupButtons';
import SubmitButton from '../../components/authComponents/SubmitButton';
import SigninSignupToggler from '../../components/authComponents/SigninSignupToggler';
import OrComponent from '../../components/authComponents/OrComponent';
import Icons from '../../components/authComponents/Icons';
import CustomStatusBar from '../../components/CustomStatusBar';
import * as Yup from 'yup';

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
    data={
      email:values.email,
      password:values.password
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
            <CustomScrollView>
              <MainElementIsland screenType="signin" marginTop={150} height={500}>
                <SigninSignupButtons activeButton="signin" />

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
              </MainElementIsland>
            </CustomScrollView>
          </>
        )
      }}
    </Formik>
  );
};

export default SigninScreen;
