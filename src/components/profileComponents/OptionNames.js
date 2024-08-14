import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ImageUrl from '../../constants/ImageUrl'
import { Icon } from '@rneui/themed'
import colors from '../../assets/colors'

const OptionNames = ({ optionName, hasMarginTop, onPresshandler, hasColour, hasIcon }) => {
  {
    const icon =
      <Icon
        type='antdesign'
        name='right'
        size={20}
        color='black'
      />
  }
  return (
    <TouchableOpacity onPress={onPresshandler}>
      <View style={[styles.container, hasMarginTop && styles.marginTop]}>
        <Text style={[styles.text, hasColour && styles.redColour]}>{optionName}</Text>
        {!hasIcon && icon}
      </View>
    </TouchableOpacity>
  )
}

export default OptionNames

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    // backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    marginLeft: 20
  },
  marginTop: {
    marginTop: 0,
    borderTopWidth: 0
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: 'left',
    paddingLeft: 10,
    color: 'black'
  },
  redColour: {
    color: colors.errorMessageColor
  }

})