import React, { useContext, useEffect, useState } from "react";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { AppLayout } from "../../layout/AppLayout";
import { RemoveRedEye } from "@mui/icons-material";
import { HotelContext } from "../../../context/HotelContex";
import { useForm } from "../../../hooks/useForm";

import { format } from "date-fns";
import { createBookingsByRoom, deleteBookingByRoom, editBookinsByRoom } from "../../../providers/bookings";
import ReservasTable from "./components/ReservasTable";
import { useSelector } from "react-redux";


const initialForm = {
    name: "",
    phone: "",
    booking_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    check_in: "",
    check_out: "",
    room: ""
}


export const Reservas = () => {

    const { getRooms, getBookingsHotel, rooms, bookings = [] } = useContext(HotelContext)
    const { name, phone, check_in, check_out, formState, onInputChange, setFormState, onResetForm } = useForm(initialForm)
    const [editing, setEditing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isResert, setIsResert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleEdit = (booking) => {
        setEditing(true)
        setFormState({
            ...booking,
            name: booking.client_name,
            phone: booking.client_phone,
            check_in: booking.entry_date,
            check_out: booking.end_date
        })
    }

    const formatearDate = (date) => {
        if (date) {
            const formattedDate = format(new Date(date), 'yyyy-MM-dd');
            return formattedDate
        }
    }

    const saveBooking = async (e) => {

        e.preventDefault()
        if (editing) {
            // Actualizar habitación existente
            const updateBooking = bookings.find((booking) => booking.id === formState.id);

            const newBooking = {
                booking_date: formState.booking_date,
                name: updateBooking.client_name,
                phone: updateBooking.client_phone,
                check_in: updateBooking.entry_date,
                check_out: updateBooking.end_date,

            }
            const resp = await editBookinsByRoom(updateBooking.id, newBooking)
            if (resp.ok) {
                getBookingsHotel()
                onResetForm()
            }
        } else {
            // Agregar nueva reserva
            const newBooking = await createBookingsByRoom(formState)
            if (newBooking.ok) {
                getBookingsHotel()
                onResetForm()
                setIsResert(false)
            } else if(!formState.room) {
                setErrorMessage('Debe seleccionar una habitacion')
            }
        }
        closeModal()
    };

    const handleDelete = async (id) => {

        const resp = await deleteBookingByRoom(id)
        if (resp.ok) return getBookingsHotel()
    }
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const setIdRoom = (id) => {
        setFormState({ ...formState, room: id });
        setIsResert(true)
        closeModal()
    }

    const cancelOption = () => {
        onResetForm()
        setEditing(false);
        setIsResert(false)
        window.location.reload();
    }
    useEffect(() => {
        getRooms()
        getBookingsHotel()
    }, []);


    return (
        <>
            <AppLayout>
                <Grid container justifyContent='space-between' sx={{ mb: 2 }}>
                    <h1>Reservas</h1>

                    <Grid item
                        alignSelf='center'>
                        <Button onClick={openModal} sx={{ maxHeight: 40 }} startIcon={<RemoveRedEye />} variant="contained" color="primary">
                            {isResert ? 'Habitacion Reservada' : 'Ver habitaciones'}
                        </Button>
                    </Grid>

                </Grid>
                {
                    errorMessage &&
                    <Grid item sx={{mb: 4}}>
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>
                }
                <form onSubmit={saveBooking}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nombre del cliente"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teléfono del cliente"
                                name="phone"
                                value={phone}
                                onChange={onInputChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de entrada"
                                type="date"
                                name="check_in"
                                value={formatearDate(check_in)}
                                onChange={onInputChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de salida"
                                type="date"
                                name="check_out"
                                value={formatearDate(check_out)}
                                onChange={onInputChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Button sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                        {editing ? 'Guardar Cambios' : 'Guardar'}
                    </Button>

                    <Button sx={{ mt: 2, ml: 2 }} onClick={cancelOption} type="submit" variant="contained" color="primary">
                        Cancelar
                    </Button>
                </form>


                <Modal open={modalOpen} onClose={closeModal}>
                    <div
                        style={{
                            width: '100vh',
                            height: '80vh',
                            backgroundColor: 'white',
                            margin: 'auto',
                            marginTop: '100px',
                            padding: '20px',
                            borderRadius: 25,
                            overflow: 'auto', // Habilita el desplazamiento
                        }}
                    >
                        {rooms.map((room) => (
                            <Card key={room.id} style={{ marginTop: '20px' }}>
                                <CardHeader title={room.room_type} />
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1">Número: {room.room_number}</Typography>
                                    <Typography variant="body1">Valor: {room.room_value}</Typography>
                                    {/* Agrega más detalles según tus necesidades */}
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setIdRoom(room.id)}
                                        /*  disabled={room.reservado} */ // Deshabilita el botón si ya está reservado
                                        >
                                            {'Reservar'}
                                        </Button>
                                        {/* Agrega aquí cualquier otro contenido que desees mostrar */}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Modal>

                <Grid container sx={{ mt: 4 }}>
                    {
                        bookings.length > 0 && <ReservasTable reservas={bookings} handleEdit={handleEdit} handleDelete={handleDelete} />
                    }
                </Grid>

            </AppLayout>

        </>
    );
};

