import { hotelApi } from "../../api";

const token = localStorage.getItem('token') || '';

export const getRoomsHotel = async () => {
    try {
        // console.log(token)
        const { data } = await hotelApi.get('/rooms', {
            headers: {
                Authorization: token
            }
        })

        return {
            ok: true,
            rooms: data?.data
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}
export const createRoomsHotel = async (body = {}) => {
    try {
        // console.log(token)
        const { data } = await hotelApi.post('/rooms', body, {
            headers: {
                Authorization: token
            }
        })

        console.log(data)
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

export const editRoomHotel = async (id, room) => {
    console.log(id, room)
    try {
        // console.log(token)
        const { data } = await hotelApi.patch(`/rooms/${id}`, room, {
            headers: {
                Authorization: token
            }
        })

        // console.log(data)
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

export const deleteRoomHotel = async (id) => {
    // console.log(id, room)
    try {
        // console.log(token)
        const { data } = await hotelApi.delete(`/rooms/${id}`, {
            headers: {
                Authorization: token
            }
        })

        // console.log(data)
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