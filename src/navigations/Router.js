import { useSelector } from "react-redux"
import AuthStack from "./AuthStack"
import ProfileStack from "./ProfileStack"
import { useEffect, useState } from "react"
import { getAuthToken } from "../utility/AuthToken"

const Router = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [isloggedIn, setIsLoggedIn] = useState(isLoggedIn?.token ? true : false)

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getAuthToken()
            if (token) {
                setIsLoggedIn(token)
            }
        }
        fetchToken()
    }, []);

    return isloggedIn ? (
        <ProfileStack />
    ) : (
        <AuthStack />
    )
}

export default Router