import { Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '@rneui/base';
import SubmitButton from '../authComponents/SubmitButton';
import ImagePicker from 'react-native-image-crop-picker';

const ProfilePhoto = ({ profilePicture, onUpdatePicture }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  const openImagePicker = async (type) => {
    setPickerModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
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
                <Image source={{ uri: profilePicture }} style={styles.modalImage} />
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
        <Image source={{ uri: profilePicture }} style={styles.imageStyling} />
        <Text style={styles.buttonText}>View Profile Picture</Text>
      </TouchableOpacity>
    </>
  )
}

export default ProfilePhoto

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background for the button
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    marginTop: 5,
    color: '#333', // Dark gray text color
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
  modalText: {
    marginTop: 15,
    color: '#007AFF', // iOS-style blue color
    fontSize: 16,
    fontWeight: '600',
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
})
