import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const width = Dimensions.get('window').width

const TestScreen = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <Image style={{width: 120, height: 20}} src={{uri:"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}} />
          <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
  // const gridSize = width / 3
  // return (
  //   <View style={{ backgroundColor: 'black', flex: 1 }}>
  //     <View style={{ height: gridSize, backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  //       <View style={{height:gridSize, width: gridSize,  backgroundColor: 'black'}}>
  //         <Text>First</Text>
  //       </View>
  //       <View style={{height:gridSize, width: gridSize, backgroundColor: 'pink'}}>
  //         <Text>Second</Text>
  //       </View>
  //       <View style={{height:gridSize, width: gridSize, backgroundColor: 'orange'}}>
  //         <Text>Third</Text>
  //       </View>
  //     </View>
  //     <View style={{ flex: 0.2, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>
  //       <Text>First</Text>
  //     </View>
  //   </View>
  // )
}

export default TestScreen