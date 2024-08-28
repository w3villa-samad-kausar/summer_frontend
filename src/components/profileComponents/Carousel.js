import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import API from '../../helpers/api/ApiHelper';
import SubmitButton from '../authComponents/SubmitButton';
import LoadingModal from '../universalComponents/LoadingModal';
import { initPaymentSheet, presentPaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');

const MyCarousel = () => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paymentData, setPaymentData] = useState({ customer: '', ephemeralKey: '', paymentIntent: '' })
    const publishableKey = Config.STRIPE_PUBLISHABLE_KEY

    const handleCardPress = async (plan, amount, index) => {
        if (plan === "Free") {
            setShowCheckout(false);
            setCurrentIndex(index);  // Set the current index to the clicked card
            return;
        }

        setLoading(true);
        const data = { amount };

        try {
            const response = await API.post('/api/payment', data);
            if (response) {
                console.log(response)
                setPaymentData({ ...paymentData, customer: response?.customer, ephemeralKey: response?.ephemeralKey?.secret, paymentIntent: response?.paymentIntent?.client_secret })
                setShowCheckout(true);
            }
        } catch (error) {
            console.log(error?.response?.data);
        } finally {
            setLoading(false);
            setCurrentIndex(index);  // Set the current index to the clicked card
        }
    };



    const handleCheckout = async () => {
        // Handle checkout logic here
        console.log("paymentData", paymentData)

        if (paymentData) {
            const { error } = await initPaymentSheet({
                merchantDisplayName: "Summer, Inc.",
                customerId: paymentData?.customer,
                customerEphemeralKeySecret: paymentData?.ephemeralKey,
                paymentIntentClientSecret: paymentData?.paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: 'Samad Kausar',
                }
            });
            if (!error) {
                const { error } = await presentPaymentSheet();
                if (error) {
                    Alert.alert(`Error code: ${error.code}`, error.message);
                } else {
                    Alert.alert('Success', 'Your order is confirmed!');
                }
            }
            else {
                console.log("ERR>>>", error)
            }
        }
    };

    return (
        <StripeProvider
            publishableKey={publishableKey}// required for 3D Secure and bank redirects
        >

            <View style={styles.container}>
                <ScrollView>
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
                        index={currentIndex}  // Control the current index
                        onIndexChanged={(index) => setCurrentIndex(index)} // Update index on swipe
                    >
                        <TouchableOpacity style={[styles.slide, styles.freePlan]} onPress={() => handleCardPress('Free', 0, 0)}>
                            <Text style={styles.text}>Free Plan</Text>
                            <Text style={styles.featuresText}>- Limited Access to Features</Text>
                            <Text style={styles.featuresText}>- Basic Support</Text>
                            <Text style={styles.featuresText}>- 5 GB Storage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.slide, styles.silverPlan]} onPress={() => handleCardPress('Silver', 500, 1)}>
                            <Text style={styles.text}>Silver Plan</Text>
                            <Text style={styles.featuresText}>- Full Access to Features</Text>
                            <Text style={styles.featuresText}>- Priority Support</Text>
                            <Text style={styles.featuresText}>- 50 GB Storage</Text>
                            <Text style={styles.featuresText}>- No Ads</Text>
                            <Text style={[styles.featuresText, { fontSize: 22, marginTop: 20, color: "green" }]}>For $5 only</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.slide, styles.goldPlan]} onPress={() => handleCardPress('Gold', 1000, 2)}>
                            <Text style={styles.text}>Gold Plan</Text>
                            <Text style={styles.featuresText}>- Full Access to All Features</Text>
                            <Text style={styles.featuresText}>- 24/7 VIP Support</Text>
                            <Text style={styles.featuresText}>- 200 GB Storage</Text>
                            <Text style={styles.featuresText}>- No Ads</Text>
                            <Text style={styles.featuresText}>- Early Access to New Features</Text>
                            <Text style={[styles.featuresText, { fontSize: 22, marginTop: 20, color: "green" }]}>For $10 only</Text>
                        </TouchableOpacity>
                    </Swiper>
                    {loading && <LoadingModal isVisible={loading} />}
                    {!loading && showCheckout && (
                        <SubmitButton label="Checkout" onPress={handleCheckout} />
                    )}
                </ScrollView>
            </View>
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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
    featuresText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
    },
    dot: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: 'black',
        width: 12,
        height: 12,
        borderRadius: 50,
        margin: 3,
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
    },
});

export default MyCarousel;
