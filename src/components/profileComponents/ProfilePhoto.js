import { Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '@rneui/base';
import SubmitButton from '../authComponents/SubmitButton';

const ProfilePhoto = ({profilePicture}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Image source={{ uri: profilePicture }} style={styles.modalImage} />
                <SubmitButton label="Update" ></SubmitButton>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
})
