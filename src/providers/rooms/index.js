import hotelApi from "../../api/hotelApi";

export const registerWithEmailPassword = async ({ first_name, last_name, email, password }) => {

    const body = { first_name, last_name, email, password }

    try {
        const { data } = await hotelApi.post('/auth/register', body)

        return {
            ok: true,
            message: data?.message,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}



export const loginWithEmailPassword = async ({ email, password }) => {
    const body = { email, password }

    try {
        const { data } = await hotelApi.post('/auth/login', body)

        const { token, token_type, user } = data;
        localStorage.setItem('token', `${token_type} ${token}`)
        console.log(data)
        return {
            ok: true,
            user
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}