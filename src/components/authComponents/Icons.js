import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'





const Icons = ({onGooglePress}) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={onGooglePress}>

        <Icon
          type='antdesign'
          name='google'
          size={30}
          color='red' />
      </TouchableOpacity>
      <TouchableOpacity>

        <Icon
          type='antdesign'
          name='facebook-square'
          size={30}
          color='blue' />

      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

  iconContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },
})

export default Icons