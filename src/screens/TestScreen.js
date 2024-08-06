import React from 'react'
import { Dimensions, Text, View } from 'react-native'

const width = Dimensions.get('window').width

const TestScreen = () => {
  const gridSize = width / 3
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <View style={{ height: gridSize, backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{height:gridSize, width: gridSize,  backgroundColor: 'black'}}>
          <Text>First</Text>
        </View>
        <View style={{height:gridSize, width: gridSize, backgroundColor: 'pink'}}>
          <Text>Second</Text>
        </View>
        <View style={{height:gridSize, width: gridSize, backgroundColor: 'orange'}}>
          <Text>Third</Text>
        </View>
      </View>
      <View style={{ flex: 0.2, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>
        <Text>First</Text>
      </View>
    </View>
  )
}

export default TestScreen