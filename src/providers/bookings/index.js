import { hotelApi } from "../../api";

const token = localStorage.getItem('token') || '';


export const getBookings = async () => {
    try {
        // console.log(token)
        const { data } = await hotelApi.get('/bookings', {
            headers: {
                Authorization: token
            }
        })

        // console.log(data?.data)
        return {
            ok: true,
            bookings: data?.data
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
export const createBookingsByRoom = async (body) => {
    try {
        // console.log(token)
        const { data } = await hotelApi.post('/bookings', body, {
            headers: {
                Authorization: token
            }
        })

        // console.log(data?.data)
        return {
            ok: true,
            message: data?.message
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const editBookinsByRoom = async (id, body) => {
    console.log(body)
    try {
        // console.log(token)
        const { data } = await hotelApi.patch(`/bookings/${id}`, body, {
            headers: {
                Authorization: token
            }
        })

        console.log(data?.data)
        return {
            ok: true,
            message: data?.message
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const deleteBookingByRoom = async (id) => {
    try {
        // console.log(token)
        const { data } = await hotelApi.delete(`/bookings/${id}`, {
            headers: {
                Authorization: token
            }
        })

        console.log(data?.data)
        return {
            ok: true,
            message: data?.message
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}