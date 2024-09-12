import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors';

// Function to capitalize the first letter of each word
const capitalizeName = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Function to get tier color
const getTierColor = (tier) => {
  switch (tier.toLowerCase()) {
    case 'free':
      return colors.freeTierColor; // Green
    case 'silver':
      return colors.silverTierColor; // Orange
    case 'gold':
      return colors.goldTierColor; // Deep Orange
    default:
      return 'black'; // Default color if tier is unknown
  }
};

// Function to capitalize the first letter of the tier
const capitalizeTier = (tier) => {
  return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
};

const NameAndPhoto = ({ name, tierName, profilePicture }) => {
  const navigation = useNavigation();

  const handleNavigation = async () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <>
        {profilePicture && <ProfilePhoto profilePicture={profilePicture} />}
        <View style={styles.nameContainer}>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.name}>{capitalizeName(name)}</Text>
          </TouchableOpacity>
          <Text style={[styles.tier, { color: getTierColor(tierName) }]}>
            {capitalizeTier(tierName)} user
          </Text>
        </View>
      </>
    </View>
  );
};

export default NameAndPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nameContainer: {
    flex: 0.8,
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: 'gray',
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tier: {
    fontSize: 13,
    fontWeight: '400',
  },
});
