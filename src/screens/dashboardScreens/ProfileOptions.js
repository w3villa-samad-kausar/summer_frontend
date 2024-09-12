import React, { useCallback, useState } from 'react';
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useFocusEffect } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProfileOptions = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true); // Set loading to true while data is being fetched
        await dispatch(getUserData());
        setIsLoading(false); // Set loading to false when data is fetched
      };

      fetchData();
    }, []) // Dependency array (you can remove userData if not necessary)
  );

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
              const response = await API.delete('/api/delete', { email: userData?.[0]?.email });
              successToastMessage(response?.msg);
              dispatch(resetAuth());
              await deleteStoredToken();
              navigation.navigate('Signin');
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
    <ScrollView>
      <PageHeading pageName='Profile' onPressHandler={() => navigation.navigate('Dashboard')} />

      {isLoading ? (
        <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
            <View style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View style={{ width: 80, height: 20, borderRadius: 4, marginTop: 10 }} />
            </View>
          </View>

          <View style={{ margin: 20 }}>
            <View style={{ width: width - 40, height: 20, borderRadius: 4 }} />
            <View style={{ width: width - 40, height: 20, borderRadius: 4, marginTop: 20 }} />
          </View>

          <View style={styles.deleteButtonContainer}>
            <View style={styles.deleteButton} />
          </View>
        </SkeletonPlaceholder>
      ) : (
        <>
          <NameAndPhoto
            name={userData[0]?.name || ''}
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
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ProfileOptions;
