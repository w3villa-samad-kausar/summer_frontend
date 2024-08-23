import { StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import API from '../../helpers/api/ApiHelper'
import { Icon } from '@rneui/themed'

const AdminDashboardScreen = () => {
    const [refresh, setRefresh] = useState(false)

    const profileFetch = async () => {
        try {

            const response = await API.get('/api/get-userdata')
            const data = {
                name: response[0].name,
                email: response[0].email,
                mobileNumber: response[0].mobile_number,
                profilePicture: response[0].profile_picture_url
            }
        } catch (error) {

            errorToastMessage(error?.response?.data)
            // console.log("errr>>>",error?.response?.data)
        }
    }

    const users = [
        {
            id: 1,
            name: 'John'
        },
        {
            id: 2,
            name: 'John'
        },
        {
            id: 3,
            name: 'John'
        },
        {
            id: 4,
            name: 'John'
        },
        {
            id: 5,
            name: 'John'
        },
        {
            id: 6,
            name: 'John'
        },
        {
            id: 7,
            name: 'John'
        },
        {
            id: 8,
            name: 'John'
        },
    ]
    const onRefresh = () => {
        setTimeout(() => {
            // callApi
            setRefresh(false)
        }, 2000)
        setRefresh(true)
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item?.id}
                renderItem={({ item }) => <UserList item={item} />}
                showsVerticalScrollIndicator={false}
                onEndReached={() => { }}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.centerMesssageText} >Hello</Text>
                        <TouchableOpacity onPress={profileFetch}>
                            <Icon
                                type='antdesign'
                                name='user'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>

    )
}

const UserList = ({ item }) => {
    return (
        <View style={{ height: 100, width: 100, backgroundColor: 'black', marginRight: 4 }}>
            <Text style={{ color: 'white' }}>{item.name}</Text>
        </View>
    )
}

export default AdminDashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerMesssage: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    centerMesssageText: {
        fontSize: 26,
        color: "black"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop:,
        padding: 20
        // gap:180
    },
    profileImage: {
        width: 50,
        height: 50,

    }

})