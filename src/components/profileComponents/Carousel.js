import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper'
import { carouselImage1 } from '../../constants/ImageUrl'
// Get screen dimensions for responsive design
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MyCarousel = () => {

    return (
        <Swiper style={styles.wrapper} showsButtons={true} scrollEnabled={true}>

                <View style={styles.slide1}>
                    <Text style={styles.text}>Hello Swiper</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            
        </Swiper>

    );
}
const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "center",
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: "red"
    },
    slide1: {
        // marginBottom:40,
        // padding: 50,
        // top: height - 695,
        borderRadius: 50,
        height: height * 0.5,
        width: width - 100,
        // flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default MyCarousel;

