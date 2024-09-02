import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View, BackHandler, Button, TouchableOpacity, Alert } from 'react-native';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/reducers/UserSlice';
import colors from '../../assets/colors';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { errorToastMessage } from '../../utility/ToastMessage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileCard = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [plan, setPlan] = useState('');
  const [profilePicture, setProfilePicture] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchUserData = async () => {
    const action = await dispatch(getUserData());
    const fetchedUserData = action.payload[0];
    setName(fetchedUserData.name);
    setEmail(fetchedUserData.email);
    setMobile(fetchedUserData.mobile_number);
    setAddress(fetchedUserData.address);
    setPlan(fetchedUserData.plan);
    setProfilePicture(fetchedUserData.profile_picture_url);
  };

  useEffect(() => {
    fetchUserData();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isModalVisible) {
          toggleModal();
          return true; // Prevent default back action
        }
        return false; // Allow default back action
      }
    );

    return () => backHandler.remove();
  }, [isModalVisible]);

  const createProfileSummary = (profileData) => {
    return `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .profile-picture { text-align: center; margin-bottom: 20px; }
          .profile-picture img { border-radius: 50%; width: 150px; height: 150px; }
          .profile-info { margin-top: 20px; }
          .profile-info p { margin: 10px 0; }
          .profile-info p strong { display: inline-block; width: 150px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Profile Summary</h1>
        </div>
        <div class="profile-picture">
          <img src="${profileData.profilePicture}" alt="Profile Picture" />
        </div>
        <div class="profile-info">
          <p><strong>Name:</strong> ${profileData.name}</p>
          <p><strong>Email:</strong> ${profileData.email}</p>
          <p><strong>Mobile Number:</strong> ${profileData.mobile}</p>
          <p><strong>Address:</strong> ${profileData.address}</p>
          <p><strong>Subscription Plan:</strong> ${profileData.plan}</p>
        </div>
      </body>
      </html>
    `;
  };

  const downloadProfileSummary = async () => {
    const profileData = {
      profilePicture: profilePicture,
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      plan: plan
    }
    try {
      const htmlContent = createProfileSummary(profileData);
      const fileName = `Profile_Summary_${profileData.name}`;
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      const options = {
        html: htmlContent,
        fileName: fileName,
        directory: 'Downloads',
        path: filePath
      };

      const pdfFile = await RNHTMLtoPDF.convert(options);
      console.log(pdfFile)
      if (pdfFile){
        Alert.alert(
          'Profile Summary Downloaded',
        )
      }
      // FileViewer.open(pdfFile.filePath)
      //   .then(() => {
      //     console.log('Profile summary downloaded successfully!');
      //   })
      //   .catch(err => console.log('Error opening PDF:', err));
    } catch (error) {
      console.error('Error generating profile summary PDF:', error);
      errorToastMessage('Error generating profile summary PDF')
    }
  };


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
        onBackdropPress={toggleModal} // Close the modal on background touch
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
              <Text style={styles.label}>Plan</Text>
              <TextInput
                style={styles.input}
                value={plan}
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
            <View style={styles.buttonContainer}>

              <TouchableOpacity style={styles.donwloadButton} onPress={downloadProfileSummary}>
                <Text style={styles.donwloadButtonText}>Download profile</Text>
              </TouchableOpacity>
            </View>


          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  caretUp: {
    alignSelf: 'center',
    width: width - 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 15,
    padding: 10,
    top: height - 70
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
    height: '65%',
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  donwloadButton: {
    width: width - 300,
    height: 50,
    backgroundColor: colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  },
  donwloadButtonText: {
    fontSize: 12,
    color: colors.secondaryBackground,

  }
});

export default ProfileCard;
