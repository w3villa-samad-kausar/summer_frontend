// import React from 'react'
// import { Image, ImageBackground, View } from 'react-native'

// const BackgroundImage = () => {
//   return (
//     <View style={{ flex: 1, borderRadius:20,  }}>
//     <Image
//       source={require('/home/w3villa/react_native/Summer/assets/images/heading1.jpg')}
//       style={{ width: '100%', height: '30%', borderBottomLeftRadius:100,borderBottomRightRadius:100  }}
//     />
//     </View>

//   )
// }

// export default BackgroundImage
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import ImageUrl from '../../constants/ImageUrl'

const BackgroundImage = ({height}) => {
  return (
    <ImageBackground
      source={ImageUrl.loginBg}
      style={[styles.backgroundImage,{height:height}]}
      imageStyle={styles.imageStyle}
    >
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  imageStyle: {
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
})

export default BackgroundImage
