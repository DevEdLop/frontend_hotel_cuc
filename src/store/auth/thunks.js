import { checkingCredentials, login, logout } from "./authSlice"
import { loginWithEmailPassword } from '../../providers/auth'

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, user, errorMessage } = await loginWithEmailPassword({ email, password })
        console.log(errorMessage)
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login(user))
    }
}