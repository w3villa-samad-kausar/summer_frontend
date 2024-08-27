import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.5}>
      <View style={styles.modalContent}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'rgba(256, 256, 256, 1)',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height:300
  },
  loadingText: {
    marginTop: 10,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
