import { StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import API from '../../helpers/api/ApiHelper'

const AdminDashboardScreen = () => {
    const [refresh, setRefresh] = useState(false)

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
                        <Text style={styles.centerMesssageText} >Hello Admin</Text>
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
        padding: 20
    },

})