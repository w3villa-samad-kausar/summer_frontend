import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileCard = () => {
  const [isVisible,setIsVisible]=useState(false)

  return (
    <Modal 
    isVisible={isVisible}
    >

    <View style={styles.container}>
    <TouchableOpacity onPress={()=>setIsVisible(true)}></TouchableOpacity>
    </View>
    </Modal>
  )
}

export default ProfileCard

const styles = StyleSheet.create({})