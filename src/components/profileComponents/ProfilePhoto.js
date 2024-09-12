import { Alert, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '@rneui/base';
import SubmitButton from '../authComponents/SubmitButton';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePicture, getUserData } from '../../redux/reducers/UserSlice';
import API from '../../helpers/api/ApiHelper';

const ProfilePhoto = ({ profilePicture }) => {
  const dispatch = useDispatch();
  const [newProfilePicture, setNewProfilepicture] = useState(profilePicture);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true); // Local loading state
  const [email, setEmail] = useState('');


  const profileFetch = async () => {
    try {
      const action = await dispatch(getUserData());
      setNewProfilepicture(action.payload[0].profile_picture_url);
      setEmail(action.payload[0].email);  
      setLoadingImage(false)
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error', 'Failed to load profile data.');
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);

  const openImagePicker = async (type) => {
    setPickerModalVisible(false);
    try {
      let image;
      if (type === 'camera') {
        image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true
        });
      } else {
        image = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        });
      }
      uploadImage(image);
    } catch (error) {
      console.log("Image selection error:", error);
      Alert.alert('Error', 'Failed to select image.');
    }
  };

  const uploadImage = async (image) => {

    setLoadingImage(true); // Set loading state to true

    const data={
      image:image,
      email:email
    }
    try {
      const action = await dispatch(changeProfilePicture(data))
      if (action) {
        Alert.alert('Success', 'Profile picture updated successfully!');
        setNewProfilepicture(action?.payload.url);
      } else {
        Alert.alert('Error', 'Failed to update profile picture.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the image.');
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Image source={{ uri: newProfilePicture }} style={styles.modalImage} />
                <SubmitButton label="Update" onPress={() => {
                  setModalVisible(false);
                  setPickerModalVisible(true);
                }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={pickerModalVisible}
        onRequestClose={() => setPickerModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.pickerModalView}>
            <Text style={styles.pickerModalTitle}>Choose an option</Text>
            <TouchableOpacity style={styles.pickerOption} onPress={() => openImagePicker('camera')}>
              <Text style={styles.pickerOptionText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerOption} onPress={() => openImagePicker('gallery')}>
              <Text style={styles.pickerOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickerOption} onPress={() => setPickerModalVisible(false)}>
              <Text style={styles.pickerOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <View style={styles.imageContainer}>
          {loadingImage ? (
            <ActivityIndicator size="small" color='black' style={styles.loader} />
          ) : (
            <Image source={{ uri: newProfilePicture }} style={styles.imageStyling} />
          )}
        </View>
        <Text style={styles.buttonText}>View Profile Picture</Text>
      </TouchableOpacity>

    </>
  )
}

export default ProfilePhoto;

const styles = StyleSheet.create({
  imageContainer: {
    width: 80, // Adjust to your desired size
    height: 80, // Adjust to your desired size
    borderRadius: 50, // Half of width/height to make it a circle
    backgroundColor: 'lightgrey', // Background color for the circle
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
  },
  imageStyling: {
    width: '100%',
    height: '100%',
    borderRadius: 50, // Same as imageContainer
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    marginTop: 5,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageStyling: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 350,
    height: 350,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  pickerModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  pickerModalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerOption: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  pickerOptionText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
