import { Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import ImageUrl from '../../constants/ImageUrl'

const ProfilePhoto = () => {
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
                <Image source={ImageUrl.profilePhoto} style={styles.modalImage} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={ImageUrl.profilePhoto} style={styles.imageStyling} />
      </TouchableOpacity>
    </>
  )
}

export default ProfilePhoto

const styles = StyleSheet.create({
  imageStyling: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background to the modal
  },
  modalView: {
    //backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
  }
})
