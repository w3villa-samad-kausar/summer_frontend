// import React from 'react'
// import { Dimensions, Image, Text, View } from 'react-native'
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// const width = Dimensions.get('window').width

// const TestScreen = () => {
//   return (
//     <SkeletonPlaceholder borderRadius={4}>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <View style={{width: 60, height: 60, borderRadius: 50}} />
//         <View style={{marginLeft: 20}}>
//           <Image style={{width: 120, height: 20}} src={{uri:"https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"}} />
//           <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
//         </View>
//       </View>
//     </SkeletonPlaceholder>
//   );
//   // const gridSize = width / 3
//   // return (
//   //   <View style={{ backgroundColor: 'black', flex: 1 }}>
//   //     <View style={{ height: gridSize, backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//   //       <View style={{height:gridSize, width: gridSize,  backgroundColor: 'black'}}>
//   //         <Text>First</Text>
//   //       </View>
//   //       <View style={{height:gridSize, width: gridSize, backgroundColor: 'pink'}}>
//   //         <Text>Second</Text>
//   //       </View>
//   //       <View style={{height:gridSize, width: gridSize, backgroundColor: 'orange'}}>
//   //         <Text>Third</Text>
//   //       </View>
//   //     </View>
//   //     <View style={{ flex: 0.2, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>
//   //       <Text>First</Text>
//   //     </View>
//   //   </View>
//   // )
// }

// export default TestScreen

import React, { useMemo, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const TestScreen = () => {
  // ref for the bottom sheet
  const bottomSheetRef = useRef(null);

  // snap points for bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // function to handle closing the sheet
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={() => bottomSheetRef.current?.expand()} />
      
      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}  // start closed
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button title="Close Bottom Sheet" onPress={handleClosePress} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TestScreen;
