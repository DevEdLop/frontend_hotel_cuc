import React, { useState } from 'react'
import { HotelContext } from './HotelContex'
import { getRoomsHotel } from '../providers/rooms';
import { getBookings } from '../providers/bookings';


const initialRoom = {
    room_number: "",
    room_type: "",
    room_value: ""
};

const initialForm = {
    client_name: "",
    client_phone: "",
    booking_date: "",
    entry_date: "",
    end_date: "",
    room_id: "",
    created_by: "",
}
export const HotelProvider = ({ children }) => {

    //Habitaciones
    const [rooms = [], setRooms] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(initialRoom);

    //Reservas
    const [bookings, setBookings] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [modalOpen, setModalOpen] = useState(false);

    const getRooms = async () => {
        const { rooms } = await getRoomsHotel()
        setRooms(rooms);
    }

    const getBookingsHotel = async () => {
        const { bookings } = await getBookings()
        setBookings(bookings)
    }
    return (
        <HotelContext.Provider value={{
            //state habitaciones
            rooms,
            dialogOpen,
            editing,
            currentRoom,
            //state reservas
            bookings,
            formData,
            modalOpen,
            
            //set habitaciones
            setDialogOpen,
            setEditing,
            setRooms,
            setCurrentRoom,
            //set reservas
            setBookings,
            setFormData,
            setModalOpen,

            //metodos
            getRooms,
            getBookingsHotel
        }}>
            {children}
        </HotelContext.Provider >
    )
}
