import { useSelector } from "react-redux"
import AuthStack from "./AuthStack"
import DashboardStack from "./DashboardStack"

const Router = () => {
    const authToken = useSelector(state => state.auth.isLoggedIn?.token)

    return authToken ? (
        <DashboardStack />
    ) : (
        <AuthStack />
    )
}

export default Router