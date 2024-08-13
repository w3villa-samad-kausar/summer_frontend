import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputFields = ({label,value,firstElement}) => {
  return (
    <View style={[styles.container, firstElement && styles.firstElement]} >
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.textInput} value={value}></TextInput>
    </View>
  )
}

export default InputFields

const styles = StyleSheet.create({
  container:{
    width:'90%',
    height:80,
    marginLeft:20,
    marginTop:5,

  },
  text:{
    fontSize:14,
    fontWeight:'bold',
    color:'black',
  },
  
  textInput:{
    fontSize:14,
    backgroundColor:'white',
    borderRadius:10,
    marginVertical:5,
    padding:5,
    // justifyContent:'space-between',
    alignItems:'center',
    // flexDirection:'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5

  },
  firstElement:{
    marginTop:20
  }
})