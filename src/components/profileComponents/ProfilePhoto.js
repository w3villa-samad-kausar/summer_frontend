import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.centeredView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image source={ImageUrl.profilePhoto} style={styles.modalImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: "100%",
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
  },
  modalImage: {
    width: 350,
    height: 350,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  }
})
