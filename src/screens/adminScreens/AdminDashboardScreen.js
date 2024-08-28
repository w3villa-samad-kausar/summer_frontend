import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
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
    const [selectedPlan, setSelectedPlan] = useState('All');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const limit = 20;

    const fetchUsers = async () => {
        if (!hasMore) return;

        const data = { limit, offset };

        try {
            const response = await API.post('/api/get-users', data);
            if (response.length < limit) {
                setHasMore(false);
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
            (user.name.toLowerCase().includes(lowercasedQuery) ||
            user.email.toLowerCase().includes(lowercasedQuery)) &&
            (selectedPlan === 'All' || user.plan === selectedPlan)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users, selectedPlan]);

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
                <Text style={styles.userPlan}>{item.plan}</Text>
            </View>
        </View>
    );

    const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
    };

    const applyFilter = (plan) => {
        setSelectedPlan(plan);
        toggleFilterModal();
    };

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
                        <View style={styles.searchFilterContainer}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                            <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
                                <Icon
                                    type='feather'
                                    name='filter'
                                    size={24}
                                    color='#007AFF'
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.filterText}>Filter: {selectedPlan}</Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.noUsersText}>No users found matching the current filters.</Text>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={toggleFilterModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter by Plan</Text>
                        <TouchableOpacity onPress={() => applyFilter('All')}>
                            <Text style={styles.filterOption}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter('free')}>
                            <Text style={styles.filterOption}>Free</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter('silver')}>
                            <Text style={styles.filterOption}>Silver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => applyFilter('gold')}>
                            <Text style={styles.filterOption}>Gold</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleFilterModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    userPlan: {
        fontSize: 14,
        color: '#007AFF',
    },
    searchFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchBar: {
        flex: 1,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        marginRight: 10,
    },
    filterButton: {
        padding: 10,
    },
    filterText: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        fontSize: 16,
        color: '#007AFF',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    filterOption: {
        fontSize: 18,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#007AFF',
    },
    noUsersText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },
});

export default AdminDashboardScreen;