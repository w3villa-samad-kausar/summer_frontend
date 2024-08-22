import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import PageHeading from '../../components/profileComponents/PageHeading';
import NameAndPhoto from '../../components/profileComponents/NameAndPhoto';
import { useRoute } from '@react-navigation/native';
import SubmitButton from '../../components/authComponents/SubmitButton';
import { Formik } from 'formik';
import FormInputField from '../../components/authComponents/FormInputField';
import * as Yup from 'yup';
import FormLabel from '../../components/profileComponents/FieldLabel';
import API from '../../helpers/api/ApiHelper';
import { errorToastMessage, successToastMessage } from '../../utility/ToastMessage';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
  address: Yup.string().required('Address is required'),
});

const EditProfile = ({ navigation }) => {
  const route = useRoute();
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
  });

  useEffect(() => {
    if (route.params) {
      const { name, email, mobileNumber, address } = route.params;
      setInitialValues({ name, email, mobileNumber, address });
    }
  }, [route.params]);

  const updateHandler = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      mobile_number: values.mobileNumber,
      address: values.address,
    };
    try {
      const response = await API.post('/api/update',data)
      successToastMessage(response?.msg)
    } catch (error) {
      errorToastMessage(error?.response?.data?.msg)
    }
  };

  return (
    <ScrollView>
      <PageHeading
        pageName='Edit Profile'
        onPressHandler={() => navigation.navigate('ProfileOptions')}
      />

      <NameAndPhoto name={initialValues.name} tierName={route.params?.plan} navigation={navigation} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={updateHandler}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <FormLabel labelText="Name" />
            <FormInputField
              placeholderText="Enter name"
              hasMarginTop={true}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={errors.name}
              touched={touched.name}
              haswidth={true}
            />

            <FormLabel labelText="Email" />
            <FormInputField
              placeholderText="Enter email"
              hasMarginTop={true}
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              haswidth={true}

            />

            <FormLabel labelText="Mobile Number" />

            <FormInputField
              placeholderText="Enter mobile number"
              hasMarginTop={true}
              keyboardType="numeric"
              value={values.mobileNumber}
              onChangeText={handleChange('mobileNumber')}
              onBlur={handleBlur('mobileNumber')}
              error={errors.mobileNumber}
              touched={touched.mobileNumber}
              haswidth={true}

            />

            <FormLabel labelText="Address" />

            <FormInputField
              placeholderText="Enter address"
              hasMarginTop={true}
              value={values.address}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              error={errors.address}
              touched={touched.address}
              haswidth={true}
              hasMultiLine={true}
            />

            <SubmitButton label="Update" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default EditProfile;
