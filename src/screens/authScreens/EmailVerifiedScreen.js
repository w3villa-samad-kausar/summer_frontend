import React from 'react';
import { View, Text } from 'react-native';

const EmailVerifiedScreen = ({ route }) => {
  const { token, email } = route.params;

  return (
    <View>
      <Text>Email Verification Successful!</Text>
      <Text>Token: {token}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
};

export default EmailVerifiedScreen;
