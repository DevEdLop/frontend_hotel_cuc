import { createSlice } from '@reduxjs/toolkit';

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        rooms: [],
        bookings: [],
        active: null
    },
    reducers: {
        createRoom: (state, action) => {
            state.rooms.push(action.payload);
        },
        updateRoom: (state, action) => {
            const { roomId, updatedRoom } = action.payload;
            const roomIndex = state.rooms.findIndex(room => room.id === roomId);
            if (roomIndex !== -1) {
                state.rooms[roomIndex] = { ...state.rooms[roomIndex], ...updatedRoom };
            }
        },
        deleteRoom: (state, action) => {
            const roomId = action.payload;
            state.rooms = state.rooms.filter(room => room.id !== roomId);
        },
        createBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        updateBooking: (state, action) => {
            const { bookingId, updatedBooking } = action.payload;
            const bookingIndex = state.bookings.findIndex(booking => booking.id === bookingId);
            if (bookingIndex !== -1) {
                state.bookings[bookingIndex] = { ...state.bookings[bookingIndex], ...updatedBooking };
            }
        },
        deleteBooking: (state, action) => {
            const bookingId = action.payload;
            state.bookings = state.bookings.filter(booking => booking.id !== bookingId);
        },
        setActive: (state, action) => {
            state.active = action.payload;
        }
    }
});

export const { createRoom, updateRoom, deleteRoom, createBooking, updateBooking, deleteBooking, setActive } = hotelSlice.actions;

