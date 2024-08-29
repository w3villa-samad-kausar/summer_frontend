import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from '@rneui/themed';
import axios from 'axios';

import MyCarousel from '../../components/profileComponents/Carousel';
import { getUserData } from '../../redux/reducers/UserSlice';
import API from '../../helpers/api/ApiHelper';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [nextAction, setNextAction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const profileFetch = async () => {
    try {
      const action = await dispatch(getUserData());
      setUserData(action.payload[0]);
      
      // Fetch next_action from AsyncStorage
      setNextAction(action.payload[0].next_action);
      console.log("nextAction",action.payload[0])
      
      // Show modal if next_action is "Email Verification"
      if (nextAction === "Email Verification") {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);

  const handleSendVerification = async () => {
    const data={
      email: userData.email,
    }
    try {
      const response = await API.post('/api/resend-email-verification',data);
      if (response) {
        alert('Verification email sent successfully!');
      }
    } catch (error) {
      console.error('Error sending verification email:', error?.response);
      alert('Failed to send verification email. Please try again later.');
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.centerMessageText}>Hello, {userData?.name || ''}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileOptions')}>
          <Icon
            type='antdesign'
            name='user'
            size={30}
          />
        </TouchableOpacity>
      </View>

      <MyCarousel />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Email Verification Required</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonSend]}
              onPress={handleSendVerification}
            >
              <Text style={styles.textStyle}>Send Verification Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonLater]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerMessage: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  centerMessageText: {
    fontSize: 26,
    color: "black"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalView: {
    height:300,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    justifyContent:'center',
    alignItems:"center"
  },
  buttonSend: {
    backgroundColor: "#2196F3",
    height:80,
    width: 170,
  },
  buttonLater: {
    backgroundColor: "#f44336",
    height:50,
    width: 170,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:16
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:"600",
    fontSize:20,
    color:'black'
  }
});

export default DashboardScreen;