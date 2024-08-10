import React from 'react';
import { View, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SigninScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        navigation.navigate('OtpVerification');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <BackgroundImage height='55%' />
          <CustomStatusBar />
          <CustomScrollView>
            <MainElementIsland screenType="signin" marginTop={150} height={470}>
              <SigninSignupButtons activeButton="signin" />

              <FormInputField
                fieldName="email"
                placeholderText="Enter email"
                hasMarginTop={false}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />

              <FormInputField
                fieldName="password"
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
      )}
    </Formik>
  );
};

export default SigninScreen;
