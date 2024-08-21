import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from "react-native-modal";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileCard = () => {

  const route=useRoute()
  const data=route?.params
  const [isModalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Simulate fetching data from an API
  useEffect(() => {
    // Example API data
    const fetchedData = {
      name:data.name,
      email:data.email,
      mobile:data.mobileNumber,
      address:data.address
    };
    
    // Set the data into state variables
    setName(fetchedData.name);
    setEmail(fetchedData.email);
    setMobile(fetchedData.mobile);
    setAddress(fetchedData.address);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.caretUp}>
          <Icon
            type='antdesign'
            name='caretup'
            size={30}
          />
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down']}
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.swipeBar} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                editable={false}
              />
            </View>
            
            <View style={styles.fieldBox}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                editable={false}
              />
            </View>

            <View style={styles.fieldBox}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={mobile}
                editable={false}
              />
            </View>

            <View style={styles.fieldBox}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                value={address}
                editable={false}
                multiline
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default ProfileCard;

const styles = StyleSheet.create({
  caretUp: {
    alignSelf: 'center',
    width: width - 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 15,
    padding: 10,
    top:height-70
  },
  swipeBar: {
    alignSelf: 'center',
    width: 60,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginVertical: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '60%',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  fieldBox: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  addressInput: {
    height: 80, 
  },
});
