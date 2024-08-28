import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import API from '../../helpers/api/ApiHelper';
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../../redux/reducers/AuthSlice';

const AdminDashboardScreen = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const limit = 20;

    const fetchUsers = async () => {
        if (!hasMore) return;

        const data = { limit, offset };

        try {
            const response = await API.post('/api/get-users', data);
            if (response.length < limit) {
                setHasMore(false); // Stop further API calls if fewer users are returned
            }
            setUsers(prevUsers => [...prevUsers, ...response]);
        } catch (err) {
            console.error('Error fetching users:', err.response.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [offset]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(lowercasedQuery) ||
            user.email.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleLoadMore = () => {
        if (hasMore) {
            setOffset(prevOffset => prevOffset + limit);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const logoutHandler = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    // onPress: () => console.log("Cancel Pressed"), // Alert closes after this
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: clearToken
                },
            ],
            { cancelable: false }
        );
    }
    const clearToken = async () => {
        dispatch(resetAuth())
      }

    const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
            <Image source={{ uri: item.profile_picture_url }} style={styles.profilePicture} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    hasMore ? <Text>Loading more users...</Text> : <Text>No more users to load.</Text>
                }
                ListHeaderComponent={
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.centerMessageText}>Hello Admin</Text>
                            <TouchableOpacity onPress={logoutHandler}>
                                <Icon
                                    type='antdesign'
                                    name='logout'
                                    size={30}
                                    color='red'
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search by name or email"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 16,
        color: '#555',
    },
    searchBar: {
        padding: 10,
        backgroundColor: 'lightgrey',
        margin: 10,
        borderRadius: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    centerMessageText: {
        fontSize: 26,
        color: "black",
    },
});

export default AdminDashboardScreen;
