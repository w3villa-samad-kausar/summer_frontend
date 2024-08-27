import AsyncStorage from "@react-native-async-storage/async-storage"


export const getAuthToken = async () => {
    const token = await getStoredToken()
    if(token){
        return token
    }
    return null
}

const getStoredToken = async () => {
    const token = await AsyncStorage.getItem('authToken') 
    return token
}

export const setStoredToken = async (token) => {
    await AsyncStorage.setItem('authToken', token) 
}

export const removeStoredToken=async()=>{
    await AsyncStorage.removeItem('authToken')
}