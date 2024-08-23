import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const MyCarousel = () => {
    const handleCardPress = (plan) => {
        console.log(`${plan} Plan selected`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.upgradeText}>Unlock more features by upgrading your plan!</Text>
            <Swiper 
                style={styles.wrapper} 
                showsButtons={true} 
                scrollEnabled={true} 
                dotStyle={styles.dot} 
                activeDotStyle={styles.activeDot}
                buttonWrapperStyle={styles.buttonWrapper}
                nextButton={<Text style={styles.buttonText}>›</Text>}
                prevButton={<Text style={styles.buttonText}>‹</Text>}
            >
                <TouchableOpacity style={[styles.slide, styles.freePlan]} onPress={() => handleCardPress('Free')}>
                <Text style={styles.text}>Free Plan</Text>
                    <Text style={styles.featuresText}>- Limited Access to Features</Text>
                    <Text style={styles.featuresText}>- Basic Support</Text>
                    <Text style={styles.featuresText}>- 5 GB Storage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.slide, styles.silverPlan]} onPress={() => handleCardPress('Silver')}>
                <Text style={styles.text}>Silver Plan</Text>
                    <Text style={styles.featuresText}>- Full Access to Features</Text>
                    <Text style={styles.featuresText}>- Priority Support</Text>
                    <Text style={styles.featuresText}>- 50 GB Storage</Text>
                    <Text style={styles.featuresText}>- No Ads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.slide, styles.goldPlan]} onPress={() => handleCardPress('Gold')}>
                <Text style={styles.text}>Gold Plan</Text>
                    <Text style={styles.featuresText}>- Full Access to All Features</Text>
                    <Text style={styles.featuresText}>- 24/7 VIP Support</Text>
                    <Text style={styles.featuresText}>- 200 GB Storage</Text>
                    <Text style={styles.featuresText}>- No Ads</Text>
                    <Text style={styles.featuresText}>- Early Access to New Features</Text>
                </TouchableOpacity>
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#f7f7f7',
    },
    upgradeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    wrapper: {
        alignSelf: 'center',
        height: height * 0.6,
        borderRadius: 20,
        overflow: 'hidden',
    },
    slide: {
        borderRadius: 20,
        height: height * 0.5,
        width: width - 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 20,
    },
    freePlan: {
        backgroundColor: '#4CAF50',
    },
    silverPlan: {
        backgroundColor: '#FF9800',
    },
    goldPlan: {
        backgroundColor: '#FF5722',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    features: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    featuresText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
    },
});

export default MyCarousel;
