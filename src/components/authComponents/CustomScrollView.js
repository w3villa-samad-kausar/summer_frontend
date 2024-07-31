// CustomScrollView.js
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const CustomScrollView = ({ children, contentContainerStyle }) => {
  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
})

export default CustomScrollView
