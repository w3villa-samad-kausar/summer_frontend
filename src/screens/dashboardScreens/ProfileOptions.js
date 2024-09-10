import React, { useEffect } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from '../../components/profileComponents/PageHeading';
import NameAndPhoto from '../../components/profileComponents/NameAndPhoto';
import OptionNames from '../../components/profileComponents/OptionNames';
import API from '../../helpers/api/ApiHelper';
import { deleteStoredToken } from '../../utility/AuthToken';
import { successToastMessage } from '../../utility/ToastMessage';
import { resetAuth } from '../../redux/reducers/AuthSlice';
import { getUserData } from '../../redux/reducers/UserSlice';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProfileOptions = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user); // Accessing the user data directly from Redux store

  useEffect(() => {
    // Only fetch user data if it's not already available
      dispatch(getUserData());
  }, [dispatch, userData]);

  const deleteHandler = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await API.delete('/api/delete', userData?.email); // Pass email in request body
              successToastMessage(response?.msg);
              dispatch(resetAuth());
              await deleteStoredToken();
              navigation.navigate('Signin'); // Navigate to Signin screen after deletion
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const logoutHandler = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: clearToken,
        },
      ],
      { cancelable: false }
    );
  };

  const clearToken = async () => {
    dispatch(resetAuth());
  };

  return (
    <>
      <ScrollView>
        <PageHeading
          pageName='Profile'
          onPressHandler={() => navigation.navigate('Dashboard')}
        />

        <NameAndPhoto
          name={userData[0]?.name || ''} // Safe access
          tierName={userData[0]?.plan || ''}
          profilePicture={userData[0]?.profile_picture_url}
        />

        <OptionNames
          optionName="Edit Profile"
          onPresshandler={() => navigation.navigate('EditProfile')}
        />

        <OptionNames
          optionName="Logout"
          hasMarginTop={true}
          hasColour={true}
          hasIcon={true}
          onPresshandler={logoutHandler}
        />

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
            <Text style={styles.deleteButtonText}>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  deleteButtonContainer: {
    marginVertical: height - 400,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  deleteButton: {
    width: width / 2,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default ProfileOptions;
