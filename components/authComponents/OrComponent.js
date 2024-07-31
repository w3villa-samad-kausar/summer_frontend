import React from 'react'
import { StyleSheet, Text } from 'react-native'

const OrComponent = () => {
  return (
    <Text style={styles.orText}>-OR-</Text>
  )
}

const styles = StyleSheet.create({
  orText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
})

export default OrComponent