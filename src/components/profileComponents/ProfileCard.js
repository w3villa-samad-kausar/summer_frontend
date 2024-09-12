import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, BackHandler, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/reducers/UserSlice';
import colors from '../../assets/colors';
import { downloadProfileSummary } from '../../helpers/ProfileSummaryCreator';

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
  }, []);

  const downloadHandler=()=>{
    const profileData = {
      profilePicture: profilePicture,
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      plan: plan
    }
    downloadProfileSummary(profileData)
  }
  
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
        onBackdropPress={toggleModal}
        style={styles.modal}
        propagateSwipe={true}  // Ensure swipe gestures are propagated
      >

        {/* <TouchableWithoutFeedback> */}

          <ScrollView style={styles.modalContent}>

            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.swipeBar} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>

              <View
                // contentContainerStyle={{ flexGrow: 1 }}
                // scrollEnabled={true}
                // keyboardShouldPersistTaps="handled"
                // keyboardDismissMode="on-drag"
              >

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
                  <TouchableOpacity style={styles.donwloadButton} onPress={downloadHandler}>
                    <Text style={styles.donwloadButtonText}>Download profile</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
              </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  caretUp: {
    alignSelf: 'center',
    width: width - 10,
    height: 60,
    backgroundColor: '#fff',
    marginVertical: 15,
    padding: 10,
    top: height - 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flex: 0.6,  // Flex added to make sure the modal content occupies the full height
  },
  scrollViewContent: {
    paddingBottom: 20,
    flexGrow: 1, // This ensures the ScrollView content can grow to the full height
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
    alignItems: "center",
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
