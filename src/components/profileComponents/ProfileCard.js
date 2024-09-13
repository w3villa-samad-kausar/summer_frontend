import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, BackHandler, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/reducers/UserSlice';
import colors from '../../assets/colors';
import { downloadProfileSummary } from '../../helpers/ProfileSummaryCreator';
import BottomSheet from '@gorhom/bottom-sheet';

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

  const downloadHandler = () => {
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

  // Ref for the bottom sheet
  const bottomSheetRef = useRef(null);

  // Snap points for bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);


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


      <BottomSheet
        ref={bottomSheetRef}
        index={isModalVisible ? 0 : -1} // Open or close based on visibility
        snapPoints={snapPoints}
        onChange={(index) => {
          if (index === -1) {
            toggleModal(); // Close the modal when bottom sheet is swiped down
          }
        }}
        enablePanDownToClose // Allows the user to swipe down to close the bottom sheet
        style={styles.modal}
      >
        <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1 }}>
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
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexGrow: 1, // Ensure ScrollView can grow to fill the available space
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
    marginTop: 20,
  },
  donwloadButton: {
    width: width - 60, // Adjusted width to fit within the bottom sheet
    height: 50,
    backgroundColor: colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  donwloadButtonText: {
    fontSize: 16,
    color: '#fff', // Replace with your color
  }
});

export default ProfileCard;
