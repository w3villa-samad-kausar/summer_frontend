import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputFields = ({label,value}) => {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.textInput} value={value}></TextInput>
    </View>
  )
}

export default InputFields

const styles = StyleSheet.create({
  container:{
    width:'90%',
    height:100,
    marginLeft:20,
    marginTop:20,

  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  
  textInput:{
    fontSize:18,
    backgroundColor:'white',
    borderRadius:10,
    marginVertical:10,
    padding:10,
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

  }
})