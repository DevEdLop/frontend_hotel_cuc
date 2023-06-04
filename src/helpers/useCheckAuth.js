import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../store/auth"

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('user') || null)
    useEffect(() => {
        if (user) {
            console.log(user)
            dispatch(login(user))
        } else {
            console.log(user)
            setTimeout(() => {
                dispatch(logout())
            }, 2000)
        }
    }, [user === null])

    return {
        status,
        user
    }

}