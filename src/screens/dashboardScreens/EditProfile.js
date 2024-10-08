import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import PageHeading from '../../components/profileComponents/PageHeading';
import NameAndPhoto from '../../components/profileComponents/NameAndPhoto';
import SubmitButton from '../../components/authComponents/SubmitButton';
import { Formik } from 'formik';
import FormInputField from '../../components/authComponents/FormInputField';
import * as Yup from 'yup';
import FormLabel from '../../components/profileComponents/FieldLabel';
import API from '../../helpers/api/ApiHelper';
import { errorToastMessage, successToastMessage } from '../../utility/ToastMessage';
import MapView from '../../components/profileComponents/MapComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/reducers/UserSlice';
import LoadingModal from '../../components/universalComponents/LoadingModal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    profilePicture: '',
    tierName: '',
  });
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Track if data is being fetched

  const profileFetch = useCallback(async () => {
    setIsFetching(true); // Start fetching
    const action = await dispatch(getUserData());
    const fetchedUserData = action.payload[0];
    setInitialValues({
      name: fetchedUserData.name,
      email: fetchedUserData.email,
      mobileNumber: fetchedUserData.mobile_number,
      address: fetchedUserData.address,
      profilePicture: fetchedUserData.profile_picture_url,
      tierName: fetchedUserData.plan,
    });
    setIsFetching(false); // Data fetched
  }, [dispatch]);

  useEffect(() => {
    profileFetch();
  }, [profileFetch]);

  const handleAddressChange = async (text, setFieldValue) => {
    setFieldValue('address', text);

    if (text.length >= 3) {
      try {
        const response = await API.get(`/api/address-auto-complete?q=${text}`);
        setAddressSuggestions(response);
        setShowSuggestions(true);
      } catch (error) {
        errorToastMessage(error?.response?.data?.msg);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion, setFieldValue) => {
    setFieldValue('address', suggestion.display_name);
    setSelectedLocation({ latitude: suggestion.lat, longitude: suggestion.lon });
    setShowSuggestions(false);
  };

  const updateHandler = async (values) => {
    setLoading(true);
    const data = {
      name: values.name,
      email: values.email,
      mobile_number: values.mobileNumber,
      address: values.address,
    };
    try {
      const response = await API.post('/api/update', data);
      setLoading(false);
      await profileFetch();
      successToastMessage(response?.msg);
    } catch (error) {
      setLoading(false);
      errorToastMessage(error);
    }
  };

  if (isFetching) {
    // Show skeleton loader while fetching user data
    return (
      <ScrollView>
        <PageHeading
          pageName='Edit Profile' />
        <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
            <View style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View style={{ width: 80, height: 20, borderRadius: 4, marginTop: 10 }} />
            </View>
          </View>

          <View style={{ marginTop: 60, marginLeft: 20 }}>
            <View style={{ width: 80, height: 20, borderRadius: 4 }} />
            <View style={{ width: width - 40, height: 40, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: 80, height: 20, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: width - 40, height: 40, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: 80, height: 20, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: width - 40, height: 40, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: 80, height: 20, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: width - 40, height: 80, borderRadius: 4, marginTop: 10 }} />
            <View style={{ width: width - 200, height: 40, borderRadius: 50, marginTop: 20, alignSelf: "center" }} />
          </View>

        </SkeletonPlaceholder>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <PageHeading
        pageName='Edit Profile'
        onPressHandler={() => navigation.navigate('ProfileOptions')}
      />

      <NameAndPhoto
        name={userData[0]?.name || ''} // Safe access
        tierName={userData[0]?.plan || ''}
        profilePicture={userData[0]?.profile_picture_url}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={updateHandler}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
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
              onChangeText={(text) => handleAddressChange(text, setFieldValue)}
              onBlur={handleBlur('address')}
              error={errors.address}
              touched={touched.address}
              haswidth={true}
              hasMultiLine={true}
            />

            {showSuggestions && (
              <View style={styles.suggestionContainer}>
                {addressSuggestions?.map((suggestion, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSuggestionSelect(suggestion, setFieldValue)}>
                    <Text style={styles.suggestionText}>{suggestion.display_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedLocation.latitude && selectedLocation.longitude && (
              <MapView latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} />
            )}

            <SubmitButton label="Update" onPress={handleSubmit} />
            <LoadingModal isVisible={loading} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  suggestionContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  suggestionText: {
    padding: 15,
    fontSize: 15,
    color: '#000',
  },
  deleteButtonContainer: {
    marginVertical: height / 1.7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  deleteButton: {
    width: width / 2,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
});

export default EditProfile;
