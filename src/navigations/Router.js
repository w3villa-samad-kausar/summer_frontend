import { useSelector } from "react-redux"
import AuthStack from "./AuthStack"
import ProfileStack from "./DashboardStack"
import { useEffect, useState } from "react"
import { getAuthToken } from "../utility/AuthToken"
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